import art1 from '../assets/Artcles/art1.jpeg'
import art2 from '../assets/Artcles/art2.jpeg'
import art3 from '../assets/Artcles/art3.jpeg'
import art4 from '../assets/Artcles/art4.jpeg'
import art5 from '../assets/Artcles/art5.jpeg'
import art6 from '../assets/Artcles/art6.jpeg'
import art7 from '../assets/Artcles/art7.jpeg'
import art8 from '../assets/Artcles/art8.jpeg'
import art9 from '../assets/Artcles/art9.jpeg'
import art10 from '../assets/Artcles/art10.jpeg'
import art11 from '../assets/Artcles/art11.jpeg'

export interface ArticleBlock {
  type: 'paragraph' | 'subheading' | 'list' | 'checklist' | 'takeaway' | 'question' | 'tags'
  text?: string
  items?: string[]
  listItems?: { title: string; desc: string }[]
}

export interface Article {
  id: number
  title: string
  subtitle: string
  date: string
  author: string
  image: string
  excerpt: string
  blocks: ArticleBlock[]
}

export const ARTICLES_DATA: Article[] = [
  {
    id: 0,
    title: "The Rise of AI in Exhibition Stand Design",
    subtitle: "Artificial Intelligence is no longer a futuristic concept—it is rapidly becoming a game-changer in the exhibition industry.",
    date: "June 05, 2026",
    author: "BEX Creative Team",
    image: art1,
    excerpt: "Traditionally, developing an exhibition stand involved multiple design revisions, client meetings, and lengthy concept development. Today, AI-powered tools can generate stand concepts within minutes...",
    blocks: [
      {
        type: 'paragraph',
        text: "Traditionally, developing an exhibition stand involved multiple design revisions, client meetings, and lengthy concept development. Today, AI-powered tools can generate stand concepts within minutes, helping designers visualize ideas faster and more accurately."
      },
      {
        type: 'subheading',
        text: "How AI is Transforming Exhibitions"
      },
      {
        type: 'list',
        listItems: [
          {
            title: "Faster Design Development",
            desc: "AI can create multiple booth concepts instantly, reducing design time significantly while offering clients a wider range of creative options."
          },
          {
            title: "Predictive Visitor Analytics",
            desc: "Modern AI tools can analyze visitor movement patterns and recommend layouts that maximize engagement and footfall."
          },
          {
            title: "Personalized Experiences",
            desc: "Future exhibition stands will adapt digital content based on visitor interests, demographics, and interaction history."
          },
          {
            title: "Cost Optimization",
            desc: "AI helps identify material efficiencies, reducing waste and controlling production costs."
          }
        ]
      },
      {
        type: 'subheading',
        text: "What This Means for Exhibitors"
      },
      {
        type: 'paragraph',
        text: "Companies embracing AI-driven exhibition solutions will enjoy:"
      },
      {
        type: 'checklist',
        items: [
          "Faster project execution",
          "Improved visitor engagement",
          "Better lead generation",
          "Increased return on investment"
        ]
      },
      {
        type: 'takeaway',
        text: "AI will not replace designers. Instead, it will empower creative teams to work smarter, innovate faster, and deliver more impactful exhibition experiences."
      },
      {
        type: 'question',
        text: "How is your company preparing for AI-powered exhibitions?"
      },
      {
        type: 'tags',
        items: ["ExhibitionDesign", "AI", "TradeShows", "Innovation", "FutureOfEvents"]
      }
    ]
  },
  {
    id: 1,
    title: "Why Sustainable Exhibition Stands Are No Longer Optional",
    subtitle: "Environmental responsibility is no longer simply a corporate initiative—it is becoming a key factor in purchasing decisions and brand reputation.",
    date: "May 28, 2026",
    author: "BEX Sustainability Team",
    image: art2,
    excerpt: "The exhibition industry has traditionally generated significant waste through one-time-use booths, printed graphics, and temporary structures. Today, clients are demanding a more sustainable approach...",
    blocks: [
      {
        type: 'paragraph',
        text: "The exhibition industry has traditionally generated significant waste through one-time-use booths, printed graphics, and temporary structures. Today, clients are demanding a more sustainable approach."
      },
      {
        type: 'subheading',
        text: "The Shift Towards Reusable Exhibitions"
      },
      {
        type: 'paragraph',
        text: "Forward-thinking exhibitors are investing in modular systems that can be adapted and reused across multiple events. Benefits include:"
      },
      {
        type: 'list',
        listItems: [
          {
            title: "Reduced Waste",
            desc: "Fewer materials are discarded after each event."
          },
          {
            title: "Lower Long-Term Costs",
            desc: "Reusable structures significantly reduce future production expenses."
          },
          {
            title: "Stronger Brand Image",
            desc: "Companies demonstrating environmental responsibility are increasingly favored by customers and stakeholders."
          },
          {
            title: "Faster Installation",
            desc: "Modular systems simplify transportation, assembly, and dismantling."
          }
        ]
      },
      {
        type: 'subheading',
        text: "Sustainable Practices Gaining Popularity"
      },
      {
        type: 'checklist',
        items: [
          "Recyclable materials",
          "Fabric graphics",
          "LED lighting",
          "Reusable aluminum systems",
          "Digital brochures and QR codes"
        ]
      },
      {
        type: 'subheading',
        text: "The Business Opportunity"
      },
      {
        type: 'paragraph',
        text: "Sustainability is not just about protecting the environment. It is also about creating cost-efficient solutions that deliver long-term value for clients."
      },
      {
        type: 'takeaway',
        text: "The most successful exhibition companies in the coming years will be those that combine creativity, functionality, and sustainability."
      },
      {
        type: 'question',
        text: "Is your next exhibition stand designed for reuse?"
      },
      {
        type: 'tags',
        items: ["Sustainability", "ExhibitionIndustry", "ESG", "GreenDesign", "TradeShows"]
      }
    ]
  },
  {
    id: 2,
    title: "The Future of Hybrid Exhibitions: Expanding Beyond Venue Walls",
    subtitle: "A hybrid event combines in-person participation with digital engagement, allowing exhibitors to connect with prospects regardless of geographical boundaries.",
    date: "May 15, 2026",
    author: "BEX Technology Team",
    image: art3,
    excerpt: "The exhibition industry has undergone a significant transformation over the past few years. Physical events remain powerful, but hybrid exhibitions are creating opportunities to engage audiences worldwide...",
    blocks: [
      {
        type: 'paragraph',
        text: "The exhibition industry has undergone a significant transformation over the past few years. Physical events remain powerful, but hybrid exhibitions are creating opportunities to engage audiences worldwide."
      },
      {
        type: 'subheading',
        text: "Why Hybrid Events Are Growing"
      },
      {
        type: 'list',
        listItems: [
          {
            title: "Greater Reach",
            desc: "A physical booth may attract hundreds of visitors, while a hybrid platform can engage thousands globally."
          },
          {
            title: "Extended Event Life",
            desc: "Digital content remains accessible before, during, and after the exhibition."
          },
          {
            title: "Better Data Collection",
            desc: "Exhibitors can track visitor interests, content engagement, and interaction history more effectively."
          },
          {
            title: "Cost-Efficient Participation",
            desc: "Attendees who cannot travel can still experience the event remotely."
          }
        ]
      },
      {
        type: 'subheading',
        text: "Technologies Driving Hybrid Events"
      },
      {
        type: 'checklist',
        items: [
          "Live streaming",
          "AI matchmaking",
          "Virtual networking lounges",
          "Interactive webinars",
          "Digital product demonstrations"
        ]
      },
      {
        type: 'takeaway',
        text: "Hybrid exhibitions are not replacing physical events. They are amplifying their impact and extending business opportunities beyond venue boundaries."
      },
      {
        type: 'question',
        text: "Would you attend an exhibition virtually if the experience was immersive enough?"
      },
      {
        type: 'tags',
        items: ["HybridEvents", "Exhibitions", "EventTechnology", "FutureOfEvents"]
      }
    ]
  },
  {
    id: 3,
    title: "Augmented Reality in Exhibitions – Beyond the Buzzword",
    subtitle: "Augmented Reality is Changing How Brands Tell Stories by allowing visitors to explore products without limits.",
    date: "May 02, 2026",
    author: "BEX Interactive Team",
    image: art4,
    excerpt: "Imagine allowing visitors to explore a product without physically touching it. Imagine showcasing machinery too large to transport. This is the power of Augmented Reality...",
    blocks: [
      {
        type: 'paragraph',
        text: "Imagine allowing visitors to explore a product without physically touching it. Imagine showcasing machinery too large to transport. Imagine demonstrating future developments that don't yet exist. This is the power of Augmented Reality (AR)."
      },
      {
        type: 'subheading',
        text: "How AR is Being Used"
      },
      {
        type: 'list',
        listItems: [
          {
            title: "Product Demonstrations",
            desc: "Visitors can view products in 3D from every angle."
          },
          {
            title: "Virtual Showrooms",
            desc: "Brands can display entire product ranges within limited exhibition space."
          },
          {
            title: "Interactive Storytelling",
            desc: "Complex concepts become easier to understand through immersive visualization."
          },
          {
            title: "Enhanced Visitor Engagement",
            desc: "AR experiences naturally attract attention and encourage participation."
          }
        ]
      },
      {
        type: 'subheading',
        text: "Why AR Matters"
      },
      {
        type: 'paragraph',
        text: "Research consistently shows that interactive experiences increase visitor engagement and information retention."
      },
      {
        type: 'takeaway',
        text: "AR is no longer a novelty. It is becoming an essential tool for creating memorable exhibition experiences."
      },
      {
        type: 'question',
        text: "How would you use AR to showcase your products?"
      },
      {
        type: 'tags',
        items: ["AugmentedReality", "Exhibitions", "Innovation", "ExperientialMarketing"]
      }
    ]
  },
  {
    id: 4,
    title: "Smart Materials Revolutionizing Interior Design",
    subtitle: "Smart Materials: The Future of Interior Design Has Arrived with materials that are smarter, more sustainable, and responsive.",
    date: "April 24, 2026",
    author: "BEX Interiors Team",
    image: art5,
    excerpt: "The materials we use in commercial and residential interiors are becoming smarter, more sustainable, and more responsive than ever before. Gone are the days when materials served only an aesthetic purpose...",
    blocks: [
      {
        type: 'paragraph',
        text: "The materials we use in commercial and residential interiors are becoming smarter, more sustainable, and more responsive than ever before. Gone are the days when materials served only an aesthetic purpose. Today, they can improve energy efficiency, enhance wellness, and even interact with occupants."
      },
      {
        type: 'subheading',
        text: "What Are Smart Materials?"
      },
      {
        type: 'paragraph',
        text: "Smart materials are engineered to react to environmental changes such as temperature, light, pressure, or moisture."
      },
      {
        type: 'subheading',
        text: "Innovations Transforming Interiors"
      },
      {
        type: 'list',
        listItems: [
          {
            title: "Self-Healing Surfaces",
            desc: "Materials capable of repairing minor scratches and wear."
          },
          {
            title: "Antimicrobial Finishes",
            desc: "Increasingly important in healthcare, hospitality, and office environments."
          },
          {
            title: "Energy-Efficient Glass",
            desc: "Smart glazing adjusts transparency and heat transmission."
          },
          {
            title: "Sustainable Composite Materials",
            desc: "Combining durability with reduced environmental impact."
          },
          {
            title: "Acoustic Innovations",
            desc: "Materials designed to improve sound quality and occupant comfort."
          }
        ]
      },
      {
        type: 'subheading',
        text: "Why Businesses Should Care"
      },
      {
        type: 'paragraph',
        text: "Smart materials contribute to:"
      },
      {
        type: 'checklist',
        items: [
          "Lower maintenance costs",
          "Improved user experience",
          "Greater sustainability",
          "Enhanced property value"
        ]
      },
      {
        type: 'takeaway',
        text: "The future of interior design lies not only in how spaces look, but in how intelligently they perform."
      },
      {
        type: 'question',
        text: "Which smart material innovation excites you the most?"
      },
      {
        type: 'tags',
        items: ["InteriorDesign", "SmartMaterials", "Architecture", "Innovation"]
      }
    ]
  },
  {
    id: 5,
    title: "The Role of 3D Printing in Exhibition & Display Production",
    subtitle: "How 3D Printing Is Transforming Exhibition Production, enabling designers to build complex geometries.",
    date: "April 11, 2026",
    author: "BEX Fabrication Team",
    image: art6,
    excerpt: "The exhibition industry thrives on creativity and customization. 3D printing is enabling designers and fabricators to create complex structures faster and more efficiently...",
    blocks: [
      {
        type: 'paragraph',
        text: "The exhibition industry thrives on creativity and customization. 3D printing is enabling designers and fabricators to create complex structures faster and more efficiently than ever before."
      },
      {
        type: 'subheading',
        text: "Key Benefits"
      },
      {
        type: 'list',
        listItems: [
          {
            title: "Rapid Prototyping",
            desc: "Design concepts can be tested quickly."
          },
          {
            title: "Greater Creativity",
            desc: "Complex geometries become easier to produce."
          },
          {
            title: "Reduced Waste",
            desc: "Materials are used more efficiently."
          },
          {
            title: "Faster Production",
            desc: "Lead times can be significantly shortened."
          },
          {
            title: "Customization",
            desc: "Every project can be tailored to specific client requirements."
          }
        ]
      },
      {
        type: 'subheading',
        text: "Future Possibilities"
      },
      {
        type: 'checklist',
        items: [
          "Custom display elements",
          "Architectural installations",
          "Branded sculptures",
          "Interactive product displays",
          "Sustainable production methods"
        ]
      },
      {
        type: 'takeaway',
        text: "3D printing is opening new possibilities for innovation while improving efficiency and sustainability."
      },
      {
        type: 'tags',
        items: ["3DPrinting", "ExhibitionDesign", "Innovation", "DisplaySolutions"]
      }
    ]
  },
  {
    id: 6,
    title: "The Exhibition Industry in 2030 – What to Expect",
    subtitle: "The Exhibition Industry in 2030: A Glimpse Into the Future, redefining how brands connect with audiences.",
    date: "March 29, 2026",
    author: "BEX Future Events Hub",
    image: art7,
    excerpt: "The next five years will bring more change to the exhibition industry than the previous twenty. Technology, sustainability, and data will redefine how brands connect with audiences...",
    blocks: [
      {
        type: 'paragraph',
        text: "The next five years will bring more change to the exhibition industry than the previous twenty. Technology, sustainability, and data will redefine how brands connect with audiences."
      },
      {
        type: 'subheading',
        text: "Trends Shaping the Future"
      },
      {
        type: 'list',
        listItems: [
          {
            title: "AI-Powered Exhibition Experiences",
            desc: "Personalized visitor journeys and intelligent recommendations."
          },
          {
            title: "Holographic Product Demonstrations",
            desc: "Products showcased without physical inventory."
          },
          {
            title: "Smart Venues",
            desc: "Connected environments providing real-time analytics."
          },
          {
            title: "Carbon-Neutral Exhibitions",
            desc: "Sustainability becoming a standard requirement."
          },
          {
            title: "Digital Twins",
            desc: "Virtual replicas of physical exhibition environments."
          },
          {
            title: "Hyper-Personalization",
            desc: "Experiences tailored to individual visitor preferences."
          }
        ]
      },
      {
        type: 'subheading',
        text: "What Will Never Change"
      },
      {
        type: 'paragraph',
        text: "Despite technological advancements, people will continue to seek human connection, meaningful conversations, and authentic experiences."
      },
      {
        type: 'takeaway',
        text: "The future belongs to exhibition companies that combine technology, creativity, sustainability, and human-centered design."
      },
      {
        type: 'question',
        text: "What do you think will be the biggest exhibition innovation by 2030?"
      },
      {
        type: 'tags',
        items: ["FutureOfExhibitions", "Innovation", "EventTechnology", "SmartVenues", "ExhibitionIndustry"]
      }
    ]
  },
  {
    id: 7,
    title: "How Neuroscience Influences Interior Design",
    subtitle: "The Science Behind Great Interior Design, influencing emotions, behavior, productivity, and decision-making.",
    date: "March 15, 2026",
    author: "BEX Interior Science Team",
    image: art8,
    excerpt: "Design affects far more than aesthetics. It influences emotions, behavior, productivity, and even decision-making. Neuroscience is helping designers better understand...",
    blocks: [
      {
        type: 'paragraph',
        text: "Design affects far more than aesthetics. It influences emotions, behavior, productivity, and even decision-making. Neuroscience is helping designers better understand how spaces impact human experiences."
      },
      {
        type: 'subheading',
        text: "What Research Tells Us"
      },
      {
        type: 'list',
        listItems: [
          {
            title: "Natural Light Improves Mood",
            desc: "Exposure to daylight enhances well-being and productivity."
          },
          {
            title: "Colors Influence Behavior",
            desc: "Different colors evoke different emotional responses."
          },
          {
            title: "Acoustics Matter",
            desc: "Noise levels directly affect concentration and stress."
          },
          {
            title: "Spatial Layout Shapes Interaction",
            desc: "Well-designed layouts encourage collaboration and engagement."
          },
          {
            title: "Nature Reduces Stress",
            desc: "Biophilic design has measurable psychological benefits."
          }
        ]
      },
      {
        type: 'subheading',
        text: "Why Businesses Should Care"
      },
      {
        type: 'paragraph',
        text: "Employee satisfaction, customer experience, and workplace performance are all influenced by design decisions."
      },
      {
        type: 'takeaway',
        text: "The best spaces are designed not just for appearance, but for human experience."
      },
      {
        type: 'tags',
        items: ["InteriorDesign", "Neuroscience", "WorkplaceWellness", "Architecture"]
      }
    ]
  },
  {
    id: 8,
    title: "The Subscription Model for Exhibition Stands",
    subtitle: "Why the Subscription Model is Revolutionizing Exhibition Stands, reducing upfront investments and material waste.",
    date: "March 02, 2026",
    author: "BEX Business Models Team",
    image: art9,
    excerpt: "For decades, companies have built new exhibition stands for every event, often resulting in high costs and unnecessary waste. Today, a new model is emerging: Exhibition Stand Subscription Programs...",
    blocks: [
      {
        type: 'paragraph',
        text: "For decades, companies have built new exhibition stands for every event, often resulting in high costs and unnecessary waste. Today, a new model is emerging: Exhibition Stand Subscription Programs. Instead of purchasing a stand outright, exhibitors subscribe to a reusable modular system that can be adapted for multiple events throughout the year."
      },
      {
        type: 'subheading',
        text: "Why Companies Are Switching"
      },
      {
        type: 'list',
        listItems: [
          {
            title: "Lower Capital Investment",
            desc: "Businesses avoid large upfront costs and spread expenses over time."
          },
          {
            title: "Consistent Brand Identity",
            desc: "A modular system maintains visual consistency across multiple exhibitions."
          },
          {
            title: "Faster Turnaround",
            desc: "Stand components can be reconfigured quickly for different venues and booth sizes."
          },
          {
            title: "Sustainability Benefits",
            desc: "Less waste means a lower environmental footprint."
          }
        ]
      },
      {
        type: 'subheading',
        text: "The Future Opportunity"
      },
      {
        type: 'paragraph',
        text: "Forward-thinking exhibition companies can offer:"
      },
      {
        type: 'checklist',
        items: [
          "Annual stand management programs",
          "Design refresh packages",
          "Storage and logistics solutions",
          "Multi-event branding support"
        ]
      },
      {
        type: 'takeaway',
        text: "Clients no longer want a stand. They want a complete exhibition solution."
      },
      {
        type: 'question',
        text: "Would your company benefit from a reusable stand subscription model?"
      },
      {
        type: 'tags',
        items: ["ExhibitionIndustry", "BusinessInnovation", "Sustainability", "TradeShows"]
      }
    ]
  },
  {
    id: 9,
    title: "How Large Format Graphics Influence Brand Perception",
    subtitle: "Large Format Graphics: More Than Just Big Prints, communicating a brand's identity instantly.",
    date: "February 18, 2026",
    author: "BEX Graphics Division",
    image: art10,
    excerpt: "Large-format graphics are among the most powerful branding tools available today. Whether in exhibitions, retail environments, offices, or events, graphics communicate brand identity instantly...",
    blocks: [
      {
        type: 'paragraph',
        text: "Large-format graphics are among the most powerful branding tools available today. Whether in exhibitions, retail environments, airports, offices, or events, graphics communicate a brand's identity instantly."
      },
      {
        type: 'subheading',
        text: "Why Graphics Matter"
      },
      {
        type: 'list',
        listItems: [
          {
            title: "Instant Recognition",
            desc: "Strong visuals create immediate awareness."
          },
          {
            title: "Emotional Connection",
            desc: "Design, color, and imagery influence how customers feel about a brand."
          },
          {
            title: "Professional Appearance",
            desc: "High-quality graphics reinforce credibility and trust."
          },
          {
            title: "Memorable Experiences",
            desc: "Visitors often remember visual experiences long after the event ends."
          }
        ]
      },
      {
        type: 'subheading',
        text: "Best Practices"
      },
      {
        type: 'checklist',
        items: [
          "Use high-resolution imagery",
          "Keep messaging concise",
          "Maintain brand consistency",
          "Design for viewing distance",
          "Integrate lighting effectively"
        ]
      },
      {
        type: 'takeaway',
        text: "People may forget conversations, but they rarely forget a powerful visual impression."
      },
      {
        type: 'tags',
        items: ["LargeFormatPrinting", "Branding", "Graphics", "VisualCommunication"]
      }
    ]
  },
  {
    id: 10,
    title: "Interior Design Trends Shaping Commercial Spaces in 2026",
    subtitle: "Commercial Interior Design Trends Defining the Future Workplace, supporting creativity, collaboration, and well-being.",
    date: "February 04, 2026",
    author: "BEX Creative Workspaces",
    image: art11,
    excerpt: "The workplace is no longer simply a location where people work. It has become a destination that supports creativity, collaboration, and well-being. Explore top commercial trends...",
    blocks: [
      {
        type: 'paragraph',
        text: "The workplace is no longer simply a location where people work. It has become a destination that supports creativity, collaboration, and well-being."
      },
      {
        type: 'subheading',
        text: "Top Trends for 2026"
      },
      {
        type: 'list',
        listItems: [
          {
            title: "Biophilic Design",
            desc: "Natural elements improve productivity and reduce stress."
          },
          {
            title: "Flexible Spaces",
            desc: "Adaptable environments support multiple working styles."
          },
          {
            title: "Smart Technology Integration",
            desc: "Automated lighting, climate control, and occupancy monitoring are becoming standard."
          },
          {
            title: "Wellness-Focused Design",
            desc: "Comfort, acoustics, air quality, and ergonomics are increasingly prioritized."
          },
          {
            title: "Sustainable Materials",
            desc: "Clients are demanding environmentally responsible solutions."
          }
        ]
      },
      {
        type: 'subheading',
        text: "Why It Matters"
      },
      {
        type: 'paragraph',
        text: "Well-designed commercial environments improve employee satisfaction, strengthen brand image, and support long-term business performance."
      },
      {
        type: 'takeaway',
        text: "Future-ready interiors balance aesthetics, functionality, technology, and sustainability."
      },
      {
        type: 'tags',
        items: ["InteriorDesign", "CommercialInteriors", "WorkplaceDesign"]
      }
    ]
  }
]
