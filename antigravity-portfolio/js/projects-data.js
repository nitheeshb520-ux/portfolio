/**
 * Real Project Repository & Case Study Data
 * Authentic background: Java Developer, Full Stack Student, Web Developer, UI/UX Enthusiast
 */

window.PORTFOLIO_PROJECTS = [
  {
    id: "local-farmers-market",
    title: "Local Farmers Market",
    category: "fullstack",
    categoryLabel: "Full-Stack Java Application",
    metric: "Core Academic & Full-Stack Capstone",
    summary: "A full-stack web application designed to connect local agricultural producers directly with community consumers, streamlining seasonal produce discovery, inventory updates, and order placement.",
    problem: "Small-scale local farmers often lack accessible, cost-effective digital tools to showcase their seasonal harvest, manage stock in real time, and process orders without expensive intermediary platform fees.",
    solution: "Engineered a complete layered full-stack application with a Java and Spring Boot backend managing relational data models, RESTful endpoints, and input validation, connected to an intuitive, responsive web frontend for smooth product discovery and cart management.",
    impact: "Successfully implemented end-to-end CRUD operations, secure order tracking workflows, responsive cross-device layout, and verified relational data integrity across products, farmers, and customer orders.",
    tags: ["Java", "Spring Boot", "Spring Data JPA", "MySQL / H2", "REST API", "HTML5", "CSS3", "JavaScript"],
    liveUrl: "#contact",
    githubUrl: "https://github.com/nitheesh-dev/local-farmers-market",
    architecture: "Layered MVC Architecture (Controller → Service → Repository pattern) with relational entity mappings (@ManyToOne, @OneToMany), JPA queries, and asynchronous frontend fetch communication."
  },
  {
    id: "farmers-market-inventory",
    title: "Farmer Inventory & Produce Management",
    category: "backend",
    categoryLabel: "Java & Database Layer",
    metric: "Structured CRUD Architecture",
    summary: "The backend administrative module of the Farmers Market platform allowing verified producers to manage daily harvest stock, seasonal pricing, and product status.",
    problem: "Agricultural produce is perishable and seasonal; inventory levels fluctuate daily, requiring a dependable data persistence layer with strict data validation to prevent stock discrepancies.",
    solution: "Built service layer business logic in Java with Spring Data JPA and Hibernate, enforcing data constraints, transactional integrity, and clear API exception handling.",
    impact: "Established consistent database transactions, standardized JSON response structures, and efficient database indexing for category and price-based queries.",
    tags: ["Core Java", "Spring Boot", "Hibernate / JPA", "Relational Database", "Data Validation", "Maven"],
    liveUrl: "#contact",
    githubUrl: "https://github.com/nitheesh-dev/local-farmers-market",
    architecture: "Data persistence with JPA repositories, custom query methods, DTO (Data Transfer Object) patterns, and comprehensive unit tests."
  },
  {
    id: "farmers-market-uiux",
    title: "Marketplace UI/UX & Responsive Storefront",
    category: "uiux",
    categoryLabel: "UI/UX Design & Frontend",
    metric: "User-Centered Accessibility",
    summary: "An accessible, responsive marketplace interface designed from wireframe concepts to functional web templates prioritizing clarity, fast loading, and ease of navigation.",
    problem: "Community marketplaces often suffer from cluttered interfaces, overwhelming navigation, and poor mobile responsiveness that discourage everyday users and local buyers.",
    solution: "Designed clean wireframes and interactive prototypes in Figma focusing on visual hierarchy, accessibility contrast, and card-based produce displays, implemented using modern CSS Grid and Flexbox.",
    impact: "Achieved seamless responsive adaptation across mobile, tablet, and desktop viewports, with intuitive filtering by category (Fruits, Vegetables, Dairy, Organic) and real-time cart state.",
    tags: ["Figma Prototyping", "UI/UX Design", "Responsive Web Design", "CSS Flexbox/Grid", "JavaScript DOM", "Accessibility"],
    liveUrl: "#contact",
    githubUrl: "https://github.com/nitheesh-dev/local-farmers-market",
    architecture: "Mobile-first responsive styling with CSS custom properties, semantic HTML5 structure, and modular JavaScript for DOM manipulation and shopping cart state."
  },
  {
    id: "farmers-market-seo",
    title: "Digital Marketing & Local Discovery Architecture",
    category: "marketing",
    categoryLabel: "SEO & Digital Strategy",
    metric: "Local SEO & Structured Metadata",
    summary: "Integration of technical SEO best practices, structured semantic microdata, and keyword architecture to enhance the discoverability of local farm produce.",
    problem: "Without deliberate search optimization and local metadata, small community platforms fail to rank against commercial supermarkets on search engines.",
    solution: "Structured product pages with semantic HTML5 tags, Open Graph meta tags, Schema.org product annotations, and search-friendly URL slugs for local discovery.",
    impact: "Demonstrated clear understanding of digital marketing fundamentals, on-page SEO optimization, crawlability, and conversion-focused call-to-actions.",
    tags: ["Technical SEO", "Schema.org", "Open Graph", "Digital Marketing", "Local Discovery", "Conversion Optimization"],
    liveUrl: "#contact",
    githubUrl: "https://github.com/nitheesh-dev/local-farmers-market",
    architecture: "Semantic markup hierarchy, automated title and description meta generation, clean URL routing, and keyword-targeted product card architecture."
  }
];
