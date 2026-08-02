import { getDatabase } from "./db";

type TargetDb = "cdaves_portal" | "cdaves_design" | "cdaves_socios" | "cdaves_security";

function getTargetDatabase(slice: string): TargetDb {
  if (["design", "settings", "design_tokens", "paginas"].includes(slice)) return "cdaves_design";
  if (["socios", "precosSocios", "precosLugarAnual", "beneficiosSocios"].includes(slice)) return "cdaves_socios";
  if (["adminUsers", "seguranca", "audit_logs"].includes(slice)) return "cdaves_security";
  return "cdaves_portal";
}

export async function handleMongoApiRequest(req: any, res: any) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname;

  // CORS & Content-Type Headers
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  const parts = pathname.replace(/^\/api\/db\/?/, "").split("/").filter(Boolean);

  try {
    // 1. GET /api/db/all — Retorna todos os documentos de todas as fatias do MongoDB
    if (req.method === "GET" && parts[0] === "all") {
      const portalDb = await getDatabase("cdaves_portal");
      const designDb = await getDatabase("cdaves_design");
      const sociosDb = await getDatabase("cdaves_socios");
      const securityDb = await getDatabase("cdaves_security");

      const collections = [
        { db: portalDb, name: "noticias", key: "noticias" },
        { db: portalDb, name: "jogos", key: "jogos" },
        { db: portalDb, name: "modalidades", key: "modalidades" },
        { db: portalDb, name: "atletas", key: "atletas" },
        { db: portalDb, name: "patrocinios", key: "patrocinios" },
        { db: portalDb, name: "historia", key: "historia" },
        { db: portalDb, name: "palmares", key: "palmares" },
        { db: portalDb, name: "instalacoes", key: "instalacoes" },
        { db: portalDb, name: "hospitalidade", key: "hospitalidade" },
        { db: portalDb, name: "contactos", key: "contactos" },
        { db: designDb, name: "paginas", key: "paginas" },
        { db: sociosDb, name: "precosSocios", key: "precosSocios" },
        { db: sociosDb, name: "precosLugarAnual", key: "precosLugarAnual" },
        { db: sociosDb, name: "beneficiosSocios", key: "beneficiosSocios" },
        { db: securityDb, name: "adminUsers", key: "adminUsers" },
      ];

      const result: Record<string, any> = {};
      for (const item of collections) {
        const docs = await item.db.collection(item.name).find({}).toArray();
        if (docs.length > 0) {
          result[item.key] = docs.map((d) => ({
            ...d,
            id: d.id || d._id.toString(),
          }));
        }
      }

      // Definições visuais do cdaves_design
      const settingsDoc = await designDb.collection("settings").findOne({ id: "global_settings" });
      if (settingsDoc) {
        delete (settingsDoc as any)._id;
        result.settings = settingsDoc;
      }

      res.statusCode = 200;
      res.end(JSON.stringify({ ok: true, data: result }));
      return;
    }

    const slice = parts[0];
    if (!slice) {
      res.statusCode = 400;
      res.end(JSON.stringify({ ok: false, error: "Nome de coleção não especificado" }));
      return;
    }

    const targetDbName = getTargetDatabase(slice);
    const db = await getDatabase(targetDbName);
    const collection = db.collection(slice);

    // 2. GET /api/db/:slice — Listar documentos da coleção no MongoDB
    if (req.method === "GET") {
      const docs = await collection.find({}).toArray();
      const mapped = docs.map((d) => ({
        ...d,
        id: d.id || d._id.toString(),
      }));
      res.statusCode = 200;
      res.end(JSON.stringify({ ok: true, slice, data: mapped }));
      return;
    }

    // Parse Body para POST, PUT e DELETE
    let bodyData: any = {};
    if (["POST", "PUT", "DELETE"].includes(req.method)) {
      const buffers: Uint8Array[] = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const rawBody = Buffer.concat(buffers).toString("utf-8");
      if (rawBody) {
        try {
          bodyData = JSON.parse(rawBody);
        } catch (_) {}
      }
    }

    // 3. POST /api/db/:slice — Inserir novo documento no MongoDB
    if (req.method === "POST") {
      const doc = {
        ...bodyData,
        criado_em: new Date(),
        atualizado_em: new Date(),
      };
      const result = await collection.insertOne(doc);
      console.log(`🟢 [MongoDB ${targetDbName}.${slice}] Inserido documento ID: ${doc.id || result.insertedId}`);

      res.statusCode = 201;
      res.end(JSON.stringify({ ok: true, id: doc.id || result.insertedId, insertedId: result.insertedId }));
      return;
    }

    // 4. PUT /api/db/:slice — Atualizar documento no MongoDB
    if (req.method === "PUT") {
      const docId = parts[1] || bodyData.id;
      if (!docId) {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, error: "ID do documento necessário para atualização" }));
        return;
      }

      const patch = {
        ...bodyData,
        atualizado_em: new Date(),
      };

      const result = await collection.updateOne(
        { $or: [{ id: docId }, { slug: docId }] },
        { $set: patch },
        { upsert: true }
      );

      console.log(`🟡 [MongoDB ${targetDbName}.${slice}] Atualizado documento ID: ${docId}`);
      res.statusCode = 200;
      res.end(JSON.stringify({ ok: true, updated: result.modifiedCount || result.upsertedCount }));
      return;
    }

    // 5. DELETE /api/db/:slice — Eliminar documento no MongoDB
    if (req.method === "DELETE") {
      const docId = parts[1] || bodyData.id;
      if (!docId) {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, error: "ID do documento necessário para eliminação" }));
        return;
      }

      await collection.deleteOne({ $or: [{ id: docId }, { slug: docId }] });
      console.log(`🔴 [MongoDB ${targetDbName}.${slice}] Eliminado documento ID: ${docId}`);

      res.statusCode = 200;
      res.end(JSON.stringify({ ok: true, deleted: true }));
      return;
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ ok: false, error: "Método não permitido" }));
  } catch (e: any) {
    console.error("Erro na API MongoDB Server Middleware:", e);
    res.statusCode = 500;
    res.end(JSON.stringify({ ok: false, error: e?.message || "Erro de servidor" }));
  }
}
