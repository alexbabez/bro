"use client"

import React from "react"
import { AnimeNavBar } from "@/components/ui/anime-navbar"
import { HomeIcon, PackageIcon, DollarSignIcon, InfoIcon } from "lucide-react"
import { useLocation } from "react-router-dom"

export function AnimeNavBarDemo() {
  const location = useLocation()
  const isMainPage = location.pathname === "/"
  
  const items = [
    {
      name: "Home",
      url: isMainPage ? "#hero" : "/",
      icon: HomeIcon
    },
    {
      name: "What We Offer",
      url: isMainPage ? "#offerings" : "/#offerings",
      icon: PackageIcon
    },
    {
      name: "Pricing",
      url: isMainPage ? "#pricing" : "/#pricing",
      icon: DollarSignIcon
    },
    {
      name: "FAQ",
      url: isMainPage ? "#faq" : "/#faq",
      icon: InfoIcon
    },
  ]

  return (
    <AnimeNavBar
      items={items}
      defaultActive={isMainPage ? "Home" : ""}
    />
  )
} 