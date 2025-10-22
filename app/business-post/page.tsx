"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ProtectedClientRoute from "@/components/Auth/ProtectedClientRoute";
import { PropertyService } from "@/services/propertyService";
import styles from "./BusinessPosting.module.css";

// A4 layout constants
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const ELEMENTS_PER_ROW = 3;
const ELEMENTS_PER_PAGE = 18;
const CELL_HEIGHT = 162.5;
const GAP = 6;

import { PropertyDetailDto } from "@/types/Property/PropertyDetailDto";

type Property = PropertyDetailDto;

type CategoryData = {
  categoryId: number;
  categoryName: string;
  elements: (Property | null)[];
  imagePositions: number[];
  uploadedImages: { ImgId: number; imageUrl: string; indices: number[] }[];
};

function CardElement({ property }: { property: Property }) {
  return (
    <div className={styles.cardPosting}>
      <div
        className={`${styles.tag} ${
          property.isMediation ? styles.mediationColor : styles.withoutMediationColor
        }`}
      >
        {property.isMediation ? "תיווך" : "ללא תיווך"}
      </div>

      <div className={styles.location}>
        {property.address}
      </div>

      <div className={styles.infoLayout}>
        <div className={`${styles.infoSection} ${styles.right}`}>
          <div>
            <Image src="/icons/home.svg" alt="Rooms" width={16} height={16} className={styles.infoIcon} />
            חדרים: {property.numberOfRoomsName}
          </div>
          <div>
            <Image src="/icons/stairs.svg" alt="Floor" width={16} height={16} className={styles.infoIcon} />
            קומה: {property.floor}
          </div>
          <div>
            <Image src="/icons/area.svg" alt="Size" width={16} height={16} className={styles.infoIcon} />
            גודל: {property.propertySizeInMeters} מ&quot;ר
          </div>
        </div>

        <div className={styles.divider} />

        <div className={`${styles.infoSection} ${styles.left}`}>
          <div className={styles.characteristicsContainer}>
            {property.isThereOptions && <span className={styles.characteristics}>אופציה </span>}
            {property.isThereParcking && <span className={styles.characteristics}>חניה</span>}
          </div>
          <div className={styles.price}>
            ₪{property.price ? property.price.toLocaleString() : "לא צוין מחיר"}
          </div>
        </div>
      </div>

      <div
        className={`${styles.footer} ${
          property.isMediation ? styles.mediationColor : styles.withoutMediationColor
        }`}
      >
        {property.fullName} {property.phone}
      </div>
    </div>
  );
}

function BusinessPostingInner() {
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);
  const [selectedGrid, setSelectedGrid] = useState<{ categoryId: number; indices: number[] }>({
    categoryId: 0,
    indices: [],
  });
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    (async () => {
      const svc = new PropertyService();
      const groups = await svc.getPropertiesList();
      if (groups && Array.isArray(groups)) {
        const cats: CategoryData[] = groups.map((g: { categoryId: number; categoryName: string; properties: PropertyDetailDto[] }) => ({
          categoryId: g.categoryId,
          categoryName: g.categoryName,
          elements: g.properties as PropertyDetailDto[],
          imagePositions: [],
          uploadedImages: [],
        }));
        setCategoriesData(cats);

        const imgs = await svc.getImages();
        if (imgs) insertImagesForCategories(imgs, cats);
      }
    })();
  }, []);

  const insertImagesForCategories = (images: { imgId: number; imageData: string; indices: number[] }[], initial: CategoryData[]) => {
    const updated = [...initial];

    images.forEach((img) => {
      const indices: number[] = img.indices || [];
      if (!indices.length) return;

      // find category for first index -> compute offset
      let currentOffset = 0;
      let categoryIndex = 0;
      for (let i = 0; i < updated.length; i++) {
        const len = updated[i].elements.length;
        if (indices[0] >= currentOffset && indices[0] < currentOffset + len) {
          categoryIndex = i;
          break;
        }
        currentOffset += len;
      }

      const category = updated[categoryIndex];
      if (!category) return;

      // convert global to local indices
      const localIndices = indices.map((g) => g - currentOffset).sort((a, b) => a - b);

      const els = [...category.elements];
      const imagePositions = new Set(category.imagePositions);

      localIndices.forEach((idx) => {
        if (imagePositions.has(idx)) return;
        els.push(null);
        for (let i = els.length - 2; i >= idx; i--) els[i + 1] = els[i];
        els[idx] = null;
        imagePositions.add(idx);
      });

      category.elements = els;
      category.imagePositions = Array.from(imagePositions);
      category.uploadedImages.push({
        ImgId: img.imgId,
        imageUrl: img.imageData,
        indices: localIndices,
      });
    });

    setCategoriesData(updated);
  };

  const getAllIndices = (categoryId: number) =>
    categoriesData.find((c) => c.categoryId === categoryId)?.uploadedImages.flatMap((i) => i.indices) ||
    [];

  const getInsertIndexSkippingImages = (categoryId: number, clicked: number) => {
    const all = getAllIndices(categoryId);
    let next = clicked + 1;
    while (all.includes(next)) next++;
    return next;
  };

  const handleCellClick = (categoryId: number, localIndex: number) => {
    const cat = categoriesData.find((c) => c.categoryId === categoryId);
    if (!cat) return;

    const clicked = cat.elements[localIndex];
    const updatedEls = [...cat.elements];
    updatedEls[localIndex] = null;

    const insertAt = getInsertIndexSkippingImages(categoryId, localIndex);

    updatedEls.push(clicked as Property | null);
    let next = updatedEls.length - 1;
    for (let i = updatedEls.length - 2; i >= insertAt; i--) {
      if (updatedEls[i] != null) {
        updatedEls[next] = updatedEls[i];
        next = i;
      }
    }
    updatedEls[insertAt] = clicked as Property | null;

    setSelectedGrid((prev) => ({
      categoryId,
      indices: prev.categoryId === categoryId ? [...prev.indices, localIndex] : [localIndex],
    }));

    setCategoriesData((prev) =>
      prev.map((c) => (c.categoryId === categoryId ? { ...c, elements: updatedEls } : c))
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || selectedGrid.indices.length === 0) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const imageBase64 = reader.result as string;
      const categoryId = selectedGrid.categoryId;
      const localIndices = [...selectedGrid.indices];

      // compute global offset for the category
      const catIndex = categoriesData.findIndex((c) => c.categoryId === categoryId);
      let globalOffset = 0;
      for (let i = 0; i < catIndex; i++) globalOffset += categoriesData[i].elements.length;
      const globalIndices = localIndices.map((li) => li + globalOffset);
      const pageNumber = Math.floor(globalIndices[0] / ELEMENTS_PER_PAGE);

      setCategoriesData((prev) =>
        prev.map((c) =>
          c.categoryId === categoryId
            ? {
                ...c,
                uploadedImages: [
                  ...c.uploadedImages,
                  { ImgId: 0, imageUrl: imageBase64, indices: localIndices },
                ],
                imagePositions: [...c.imagePositions, ...localIndices],
              }
            : c
        )
      );

      setSelectedGrid({ categoryId: 0, indices: [] });

      const svc = new PropertyService();
      await svc.saveImage(1, pageNumber, globalIndices, imageBase64.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = async (categoryId: number, imgId: number) => {
    const svc = new PropertyService();
    const ok = await svc.deleteImage(imgId);
    if (ok) {
      // reload
      const groups = await svc.getPropertiesList();
      if (groups && Array.isArray(groups)) {
        const cats: CategoryData[] = groups.map((g: { categoryId: number; categoryName: string; properties: PropertyDetailDto[] }) => ({
          categoryId: g.categoryId,
          categoryName: g.categoryName,
          elements: g.properties as PropertyDetailDto[],
          imagePositions: [],
          uploadedImages: [],
        }));
        setCategoriesData(cats);
        const imgs = await svc.getImages();
        if (imgs) insertImagesForCategories(imgs, cats);
      }
    }
  };

  const handleSavePdf = async () => {
  if (!pdfRef.current) return;

  setIsGeneratingPdf(true);
  try {
    // use the bundled build so html2canvas + jsPDF are included
    const mod = await import("html2pdf.js/dist/html2pdf.bundle.min.js");
    const html2pdf = (mod as { default?: unknown }).default || mod;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (html2pdf as any)()
      .set({
        margin: [0, 0, 0, 0],
        filename: "business-posting.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      })
      .from(pdfRef.current)
      .toContainer()
      .toCanvas()
      .toImg()
      .toPdf()
      .save();
  } finally {
    setIsGeneratingPdf(false);
  }
};

  const cellWidth = Math.floor((A4_WIDTH - 12) / ELEMENTS_PER_ROW);

  const renderCategoryPages = (category: CategoryData) => {
    const pages: (Property | null)[][] = [];
    let currentPage: (Property | null)[] = [];
    let count = 0;

    category.elements.forEach((el, idx) => {
      if (count === ELEMENTS_PER_PAGE || (count % ELEMENTS_PER_ROW === 0 && count + ELEMENTS_PER_ROW > ELEMENTS_PER_PAGE)) {
        pages.push(currentPage);
        currentPage = [];
        count = 0;
      }

      if (idx === 0 && count % ELEMENTS_PER_ROW !== 0) {
        const remaining = ELEMENTS_PER_ROW - (count % ELEMENTS_PER_ROW);
        for (let i = 0; i < remaining; i++) currentPage.push(null);
        count += remaining;
      }

      currentPage.push(el);
      count++;
    });

    if (currentPage.length > 0) pages.push(currentPage);

    return pages.map((pageEls, pageIndex) => (
      <div
        key={`${category.categoryId}-${pageIndex}`}
        style={{
          position: "relative",
          minHeight: `${A4_HEIGHT}px`,
          width: `${A4_WIDTH}px`,
          overflow: "hidden",
          marginTop: "0px",
        }}
      >
        <div className={styles.customHeader}>
          <div className={styles.headerLabelBg}>
            <span className={styles.headerLabel}>{category.categoryName}</span>
          </div>
          <div className={styles.headerLine} />
        </div>

        {category.uploadedImages.map((imgObj, i) => {
          const selectedCells = imgObj.indices
            .filter((localIdx) => Math.floor(localIdx / ELEMENTS_PER_PAGE) === pageIndex)
            .map((localIdx) => {
              const indexInPage = localIdx % ELEMENTS_PER_PAGE;
              return { row: Math.floor(indexInPage / ELEMENTS_PER_ROW), col: indexInPage % ELEMENTS_PER_ROW };
            });

          if (!selectedCells.length) return null;

          const minRow = Math.min(...selectedCells.map((c) => c.row));
          const maxRow = Math.max(...selectedCells.map((c) => c.row));
          const minCol = Math.min(...selectedCells.map((c) => c.col));
          const maxCol = Math.max(...selectedCells.map((c) => c.col));

          const imgTop = minRow * CELL_HEIGHT + GAP * minRow;
          const imgLeft = minCol * cellWidth + 3;
          const imgWidth = (maxCol - minCol + 1) * cellWidth + 2 * (maxCol - minCol + 1);
          const imgHeight = (maxRow - minRow + 1) * CELL_HEIGHT;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${imgTop}px`,
                right: `${imgLeft}px`,
                width: `${imgWidth}px`,
                height: `${imgHeight}px`,
                zIndex: 3,
                marginRight:
                  imgObj.indices[0] % 3 === 0 ? "0px" : imgObj.indices[0] % 3 === 1 ? "3px" : "6px",
                marginTop: "50px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            >
              <Image
                src={imgObj.imageUrl}
                alt=""
                fill
                style={{ objectFit: "cover", pointerEvents: "none" }}
              />
              {!isGeneratingPdf && (
                <button
                  onClick={() => handleDeleteImage(category.categoryId, imgObj.ImgId)}
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    fontSize: "16px",
                    lineHeight: "20px",
                    textAlign: "center",
                    padding: "0",
                    zIndex: 4,
                  }}
                  title="Delete image"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${ELEMENTS_PER_ROW}, ${cellWidth}px)`,
            gap: `${GAP}px`,
            position: "relative",
            zIndex: 2,
          }}
        >
          {pageEls.map((el, indexInPage) => {
            const localIndex = pageIndex * ELEMENTS_PER_PAGE + indexInPage;
            const isEmpty =
              category.imagePositions.includes(localIndex) ||
              (selectedGrid.categoryId === category.categoryId &&
                selectedGrid.indices.includes(localIndex));

            return (
              <div
                key={localIndex}
                onClick={() => handleCellClick(category.categoryId, localIndex)}
                style={{
                  width: `${cellWidth}px`,
                  height: `${CELL_HEIGHT}px`,
                  overflow: "hidden",
                  boxSizing: "border-box",
                  cursor: "pointer",
                }}
              >
                {!isEmpty && el && <CardElement property={el} />}
              </div>
            );
          })}
        </div>

        {/* Footer per page */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            marginBottom: "3px",
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 20px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: "100%", borderBottom: "1px solid #1a3b6d", marginBottom: "5px" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <Image src="/images/logo6.png" alt="Logo" width={120} height={40} />
            <div style={{ color: "#d4a373" }}>גליון 1</div>
            <div className={styles.headerLabelBg}>
              <span className={styles.headerLabel}>מכירה</span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div
      style={{
        width: `${A4_WIDTH}px`,
        margin: "0 auto",
        position: "relative",
        marginTop: selectedGrid.indices.length > 0 ? "120px" : "64px",
      }}
      dir="rtl"
    >
      <button onClick={handleSavePdf} className={styles.pdfSaveButton}>
        📄 שמור הכל ל-PDF
      </button>

      <div
        className={`${styles.uploadContainer} ${
          selectedGrid.indices.length === 0 ? styles.hidden : ""
        }`}
      >
        <div className={styles.uploadContent}>
          <p className={styles.uploadLabel}>העלאת תמונה לתאים נבחרים:</p>
          <div className={styles.selectedIndices}>
            {selectedGrid.indices.map((idx, i) => (
              <span key={i}>
                {idx}
                {i < selectedGrid.indices.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
          <div className={styles.uploadInputWrapper}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.uploadInput}
              id="image-upload"
            />
            <label htmlFor="image-upload" className={styles.uploadButton}>
              <svg className={styles.uploadIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              העלאת תמונה
            </label>
          </div>
        </div>
      </div>

      <div ref={pdfRef}>
        {categoriesData.map((cat) => (
          <div key={cat.categoryId}>{renderCategoryPages(cat)}</div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedClientRoute>
      <BusinessPostingInner />
    </ProtectedClientRoute>
  );
}
