// js/models/projects.js
// Model — ML, AI, and software project data for Gregory Kojadinovich II

const projects = [
  {
    title: "AIMO3 — AI Mathematical Olympiad",
    tag: "Machine Learning / AI",
    medal: "First Silver Medalist",
    description: "Engineered solution expansion pathways through seed diversity and entropy-weighted voting systems for final answer selection. Worked with NVIDIA H100 GPUs and OpenAI GPT-OSS-120B. Writing academic paper on the prompt engineering methodology.",
    link: "https://www.kaggle.com/gregkoja",
    linkLabel: "View on Kaggle",
    thumb: "assets/images/thumbnails/thumb-aimo3-placement.jpg"
  },
  {
    title: "AIMO2 — DeepSeek R1 Fine-Tuning",
    tag: "LLM Fine-Tuning",
    medal: null,
    description: "Fine-tuned a distilled DeepSeek R1 LLM using four NVIDIA L4 GPUs with CUDA to answer AI Mathematical Olympiad problems. Performed prompt engineering and model building in HuggingFace.",
    link: "https://www.kaggle.com/code/gregkoja/prompt-engineering-deepseek-r1-aimo",
    linkLabel: "View on Kaggle",
    thumb: "assets/images/aimo2.png"
  },
  {
    title: "Color Wheel — iOS App",
    tag: "iOS / SwiftUI",
    medal: null,
    description: "Free iOS app for painters learning color theory. Built with SwiftUI and powered by real subtractive RYB pigment mixing physics — not the RGB model taught in digital design. Try the interactive web version on the Color Wheel page.",
    link: "https://apps.apple.com/app/colorwheel",
    linkLabel: "Download on App Store",
    thumb: "assets/images/AppIcon.png",
    thumbIcon: true
  },
  {
    title: "Housing Price Predictions — XGBoost",
    tag: "Data Science / ML",
    medal: "Top 1% on Kaggle",
    description: "Predictive model for housing prices using a stacked regression approach with GPU-accelerated XGBoost training. Applied feature engineering and hyperparameter tuning to push into the top 1% of all submissions.",
    link: "https://www.kaggle.com/code/gregkoja/housing-price-predictions-with-xgboost-and-gpu",
    linkLabel: "View on Kaggle",
    thumb: "assets/images/stackedregressor.png"
  },
  {
    title: "Coffee Sales EDA",
    tag: "Data Science / Python",
    medal: null,
    description: "Exploratory data analysis on coffee sales data, visualizing pricing trends, seasonal variations, and consumer preferences using Python — Pandas, Matplotlib, and Seaborn.",
    link: "https://www.kaggle.com/code/gregkoja/coffee-sales-eda",
    linkLabel: "View on Kaggle",
    thumb: "assets/images/cafe_sales_eda.png"
  },
  {
    title: "Brasil Olist Commerce — Geospatial EDA",
    tag: "Geospatial Analysis",
    medal: null,
    description: "Applied geospatial analysis to Brazilian e-commerce transaction data, mapping customer distribution, seller locations, and delivery trends to uncover actionable business insights.",
    link: "https://www.kaggle.com/code/gregkoja/brasil-olist-commerce-dataset-geospatial-eda",
    linkLabel: "View on Kaggle",
    thumb: "assets/images/blist_schema.png"
  },
  {
    title: "Properties of Metals EDA",
    tag: "Data Science / Python",
    medal: null,
    description: "Exploratory data analysis on material properties of metals — examining relationships between hardness, tensile strength, density, and other physical characteristics using Python.",
    link: "https://www.kaggle.com/code/gregkoja/properties-of-metals-eda",
    linkLabel: "View on Kaggle",
    thumb: "assets/images/heatmapmatrix.png"
  }
];

const certificates = [
  "NCEES FE — Chemical Engineering",
  "Stanford Machine Learning Specialization",
  "IBM Professional Data Scientist",
  "ML-Ops Specialization",
  "iOS Swift Development"
];
