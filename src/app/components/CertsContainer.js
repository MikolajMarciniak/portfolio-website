/* eslint-disable @next/next/no-img-element */
import React from "react";
import SpotlightCard from "./SpotlightCard";
import { certificates } from "../data/certsData";

export function CertsContainer({ translation = [] }) {
  // Create a translated version of certificates
  const translatedCerts = certificates.map((cert) => {
    const translatedEntry = translation.find((t) => t.id === cert.id);
    return {
      ...cert,
      title: translatedEntry ? translatedEntry.title : cert.title,
    };
  });

  return (
    <section className="pt-14 pb-20">
      <div className="flex flex-col text-white items-center w-full justify-center mx-auto max-w-md sm:max-w-lg md:max-w-3xl ">
        <div className="grid grid-cols-1 w-full md:grid-cols-3 gap-6 sm:gap-6">
          {translatedCerts.map((cert, index) => (
            <a key={index} target="blank" href={cert.link} className="block">
              <SpotlightCard>
                <img
                  src={`/icons/issuers/${cert.icon}.svg`}
                  alt={cert.icon}
                  className="w-8 h-8 mb-3"
                />
                <h3 className="text-md pl-1 font-semibold">{cert.title}</h3>
              </SpotlightCard>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CertsContainer;
