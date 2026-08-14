"use client";


import { useEffect, useState } from "react";


import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardCards from "@/components/dashboard/DashboardCards";
import WelcomeCard from "@/components/dashboard/WelcomeCard";


interface DashboardStats {
  walletBalance: number;
  properties: number;
  businesses: number;
  listings: number;
  messages: number;
}


interface DashboardUser {
  firstName: string;
}


export default function DashboardPage() {


  const [stats, setStats] =
    useState<DashboardStats>({
      walletBalance: 0,
      properties: 0,
      businesses: 0,
      listings: 0,
      messages: 0,
    });


  const [user, setUser] =
    useState<DashboardUser>({
      firstName: "",
    });


  const [loading, setLoading] =
    useState(true);


  useEffect(() => {


    async function loadDashboard() {


      try {


        const [
          statsResponse,
          userResponse,
        ] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/user/me"),
        ]);


        const statsResult =
          await statsResponse.json();


        const userResult =
          await userResponse.json();


        if (statsResult.success) {


          setStats({


            walletBalance: Number(
              statsResult.stats.walletBalance
            ),


            properties:
              statsResult.stats.properties,


            businesses:
              statsResult.stats.businesses,


            listings:
              statsResult.stats.listings,


            messages:
              statsResult.stats.messages,


          });


        }


        if (userResult.success) {


          setUser({
            firstName:
              userResult.user.firstName,
          });


        }


      } catch (error) {


        console.error(error);


      } finally {


        setLoading(false);


      }


    }


    loadDashboard();


  }, []);


  return (


    <DashboardLayout
      title="Dashboard"
    >


      <DashboardCards


        walletBalance={
          loading
            ? 0
            : stats.walletBalance
        }


        properties={
          loading
            ? 0
            : stats.properties
        }


        businesses={
          loading
            ? 0
            : stats.businesses
        }


        listings={
          loading
            ? 0
            : stats.listings
        }


        messages={
          loading
            ? 0
            : stats.messages
        }


      />


      <WelcomeCard
        firstName={user.firstName}
      />


    </DashboardLayout>


  );


}