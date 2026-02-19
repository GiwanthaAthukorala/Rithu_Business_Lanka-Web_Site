import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import SocialMedia from "../components/SocialMedia";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Head from "next/head";
import Feedback from "@/components/Feedback";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rithu Sociol - Digital Marketing Agency</title>
        <meta
          name="description"
          content="Premier digital marketing agency in Sri Lanka offering Facebook, Instagram, TikTok marketing, logo design, AI video creation, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative">
        <Header />
        <main>
          <Hero />
          <Services />
          <SocialMedia />
          <Feedback />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
