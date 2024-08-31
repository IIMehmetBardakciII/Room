import { ReactNode } from "react";
import {
  ELearning,
  Home,
  AboutUs,
  ArrowRight,
  FeedBack,
  Help,
  LikeVideos,
  MyClasses,
  MyProjects,
  ProjectCommunity,
  SearchClass,
  Settings,
  TrendProjects,
  TrendVideos,
  VirtualClass,
  History,
} from "../components/svgs";

type NavItem = {
  active: boolean;
  icon: ReactNode; // SVG bileşeni ReactNode olarak kabul ediliyor
  text: string;
  link?: string;
  reverse?: boolean;
};
type sidebarNavItemsProps = {
  mainNav: NavItem[];
  YourInfo: NavItem[];
  Discover: NavItem[];
  Footer: NavItem[];
};
export const sidebarNavItems = {
  mainNav: [
    {
      active: true,
      icon: Home,
      text: "Anasayfa",
      link: "/",
    },
    {
      active: false,
      icon: ELearning,
      text: "E-Öğrenme",
      link: "/e-learning",
    },
    {
      active: false,
      icon: VirtualClass,
      text: "Sınıfım",
      link: "#",
    },
    {
      active: false,
      icon: ProjectCommunity,
      text: "Proje Topluluğu",
      link: "#",
    },
  ],

  YourInfo: [
    {
      active: false,
      icon: ArrowRight,
      text: "Siz",
      link: "#",
      reverse: true,
    },
    {
      active: false,
      icon: LikeVideos,
      text: "Beğendiğim Videolar",
      link: "#",
    },
    {
      active: false,
      icon: MyClasses,
      text: "Katıldığım Sınıflar",
      link: "#",
    },
    {
      active: false,
      icon: MyProjects,
      text: "Projelerim",
      link: "#",
    },
    {
      active: false,
      icon: History,
      text: "Geçmiş",
      link: "#",
    },
  ],

  Discover: [
    {
      active: false,
      icon: TrendVideos,
      text: "Trend Videolar",
      link: "#",
    },
    {
      active: false,
      icon: TrendProjects,
      text: "Trend Projeler",
      link: "#",
    },
    {
      active: false,
      icon: SearchClass,
      text: "Sınıf Ara",
      link: "#",
    },
  ],

  Footer: [
    {
      active: false,
      icon: Settings,
      text: "Ayarlar",
      link: "#",
    },
    {
      active: false,
      icon: FeedBack,
      text: "Geri Bildirim Gönder",
      link: "#",
    },
    {
      active: false,
      icon: Help,
      text: "Yardım",
      link: "#",
    },
    {
      active: false,
      icon: AboutUs,
      text: "Hakkımızda",
      link: "#",
    },
  ],
};
