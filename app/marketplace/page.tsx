"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Marketplace() {
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [ecoFilterValue, setEcoFilterValue] = useState([0]);
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [sortBy, setSortBy] = useState("newest");
    const [filteredDesigns, setFilteredDesigns] = useState([]);
    const [selectedDesign, setSelectedDesign] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const allMaterials = ["Cotton", "Wool", "Polyester"]; // Example materials

    const toggleMaterial = (material) => {
        setSelectedMaterials((prev) =>
            prev.includes(material)
                ? prev.filter((m) => m !== material)
                : [...prev, material]
        );
    };

    const handleOpenDetailsModal = (design) => {
        setSelectedDesign(design);
        setIsDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    const handleOpenOrderModal = () => {
        setIsOrderModalOpen(true);
    };

    const handleCloseOrderModal = () => {
        setIsOrderModalOpen(false);
    };

    const handleOrderComplete = () => {
        setIsOrderModalOpen(false);
        alert("Order completed!");
    };

    useEffect(() => {
        const fetchMarketplaceData = async () => {
            try {
                const response = await fetch("http://127.0.0.1/get-marketplace");
                if (!response.ok) {
                    throw new Error("Failed to fetch marketplace data");
                }
                const data = await response.json();
                setFilteredDesigns(data);
            } catch (error) {
                console.error("Error fetching marketplace data:", error);
            }
        };

        fetchMarketplaceData();
    }, []);

    const styles = {
        page: {
            minHeight: "100vh",
            backgroundColor: "#FAFAFA", // Off-white background
            color: "#16A34A",
            fontFamily: "Arial, sans-serif",
        },
        heroSection: {
            background: "linear-gradient(to right, #E8F5E9, #F1F8E9)", // Gradient background
            padding: "3rem 0",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
        },
        heroTitle: {
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#2E7D32", // Dark green
            marginBottom: "1rem",
        },
        heroSubtitle: {
            fontSize: "1.25rem",
            color: "#558B2F", // Medium green
            marginBottom: "2rem",
        },
        searchInput: {
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid #A5D6A7",
            backgroundColor: "#FFFFFF", // White background
            color: "#B0BEC5", // Off-white gray text
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
            display: "block",
        },
        filters: {
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2rem",
        },
        filterButton: (isActive) => ({
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            backgroundColor: isActive ? "#2E7D32" : "#efefef",
            color: isActive ? "#FFFFFF" : "#558B2F",
            border: "none",
            cursor: "pointer",
        }),
        galleryGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
        },
        card: {
            padding: "1rem",
            border: "1px solid #A5D6A7",
            borderRadius: "0.5rem",
            backgroundColor: "#FFFFFF",
            cursor: "pointer",
            textAlign: "center",
        },
        noResults: {
            textAlign: "center",
            padding: "2rem",
            color: "#558B2F",
        },
    };

    return (
        <div style={styles.page}>
            {/* Hero Section */}
            <section style={styles.heroSection}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={styles.heroTitle}
                >
                    Explore EcoFitz Designs
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={styles.heroSubtitle}
                >
                    Discover and order sustainable fashion designs created by our
                    community of eco-conscious designers.
                </motion.p>
                <input
                    type="text"
                    placeholder="Search designs, designers, or materials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                />
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Filters */}
                <div style={styles.filters}>
                    {["all", "tops", "bottoms", "outerwear", "accessories"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setCategory(tab)}
                            style={styles.filterButton(category === tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                {filteredDesigns.length > 0 ? (
                    <div style={styles.galleryGrid}>
                        <AnimatePresence>
                            {filteredDesigns.map((design) => (
                                <motion.div
                                    key={design.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    layout
                                >
                                    <div
                                        style={styles.card}
                                        onClick={() => handleOpenDetailsModal(design)}
                                    >
                                        <h3>{design.name}</h3>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div style={styles.noResults}>
                        <h3>No designs found</h3>
                        <p>Try adjusting your filters or search query</p>
                    </div>
                )}
            </main>
        </div>
    );
}
