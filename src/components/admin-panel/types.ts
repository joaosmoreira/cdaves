import React from "react";

export type NavItem = { label: string; icon: React.ReactNode; id: string };
export type NavGroup = { group: string; items: NavItem[] };

export type GameRecord = {
  id: string | number;
  opponent: string;
  date: string;
  time: string;
  stadium: string;
  competition: string;
  homeScore: number | null;
  awayScore: number | null;
  isHome: boolean;
};

export type ArticleRecord = {
  id: string | number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  views: number;
  published: boolean;
};
