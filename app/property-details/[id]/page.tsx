import React from 'react';
import { Metadata } from 'next';
import PropertyDetails from '@/components/PropertyDetails/PropertyDetails';
import { serverPropertyService } from '@/services/serverPropertyService';

interface PropertyDetailsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PropertyDetailsPageProps): Promise<Metadata> {
  const property = await serverPropertyService.getPropertyById(params.id);
  
  if (!property) {
    return {
      title: 'נכס לא נמצא | מיד ליד',
      description: 'הנכס המבוקש לא נמצא במערכת',
    };
  }

  const title = `${property.fullName} | ${property.address} | ₪${property.price.toLocaleString()}`;
  const description = `נכס למכירה ב${property.address} - ${property.numberOfRoomsName} חדרים, ${property.propertySizeInMeters} מ"ר, קומה ${property.floor}`;

  return {
    title,
    description,
    keywords: [
      'נדל"ן',
      'דירה למכירה',
      property.address,
      `${property.numberOfRoomsName} חדרים`,
      `${property.propertySizeInMeters} מ"ר`,
      'מיד ליד'
    ],
    openGraph: {
      title,
      description,
      images: property.imageUrl ? [property.imageUrl] : [],
      type: 'website',
      locale: 'he_IL',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: property.imageUrl ? [property.imageUrl] : [],
    },
    alternates: {
      canonical: `/property-details/${params.id}`,
    },
  };
}

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const property = await serverPropertyService.getPropertyById(params.id);

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center">נכס לא נמצא</h1>
        <p className="text-center mt-4">הנכס המבוקש לא נמצא במערכת</p>
      </div>
    );
  }

  return <PropertyDetails property={property} />;
}
