import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const listingSteps = [
  {
    number: 1,
    title: "Prepare Your Home",
    timeframe: "1-2 weeks",
    description: "Get your property market-ready with staging, repairs, and improvements that maximize value.",
    details: [
      "Complete necessary repairs and maintenance",
      "Deep clean entire property",
      "Stage rooms to highlight best features",
      "Improve curb appeal with landscaping",
      "Declutter and depersonalize spaces"
    ],
    tips: [
      "First impressions matter - focus on entryway and exterior",
      "Neutral colors appeal to more buyers",
      "Remove personal items to help buyers envision themselves"
    ]
  },
  {
    number: 2,
    title: "Professional Valuation",
    timeframe: "2-3 days",
    description: "Determine the optimal listing price through comprehensive market analysis and property evaluation.",
    details: [
      "Comparative Market Analysis (CMA)",
      "Property condition assessment",
      "Market trends evaluation",
      "Pricing strategy development",
      "Competition analysis"
    ],
    tips: [
      "Price competitively from the start to attract serious buyers",
      "Consider recent sales within 3-6 months",
      "Factor in unique property features and improvements"
    ]
  },
  {
    number: 3,
    title: "Marketing Strategy",
    timeframe: "3-5 days",
    description: "Create compelling marketing materials to showcase your property across multiple channels.",
    details: [
      "Professional photography session",
      "Virtual tour creation",
      "Property description writing",
      "Marketing material design",
      "Online listing optimization"
    ],
    tips: [
      "High-quality photos can increase showing requests by 60%",
      "Virtual tours help pre-qualify serious buyers",
      "Highlight unique features and neighborhood amenities"
    ]
  },
  {
    number: 4,
    title: "List Your Property",
    timeframe: "1-2 days",
    description: "Officially list your property on MLS and major real estate platforms with all required documentation.",
    details: [
      "MLS listing creation and activation",
      "Property disclosure completion",
      "HOA documentation gathering",
      "Title and deed verification",
      "Listing agreement execution"
    ],
    tips: [
      "Complete disclosure protects you legally",
      "MLS exposure reaches 90% of active buyers",
      "Accurate property details prevent delays later"
    ]
  },
  {
    number: 5,
    title: "Manage Showings",
    timeframe: "Ongoing",
    description: "Coordinate property showings and open houses while collecting valuable buyer feedback.",
    details: [
      "Showing schedule coordination",
      "Open house planning and hosting",
      "Buyer feedback collection",
      "Security and safety protocols",
      "Property maintenance during showings"
    ],
    tips: [
      "Be flexible with showing times to accommodate buyers",
      "Keep property show-ready at all times",
      "Consider buyer feedback for potential adjustments"
    ]
  },
  {
    number: 6,
    title: "Receive & Negotiate Offers",
    timeframe: "Variable",
    description: "Evaluate incoming offers and negotiate terms to secure the best deal for your property.",
    details: [
      "Offer evaluation and comparison",
      "Buyer qualification verification",
      "Counteroffer strategy development",
      "Terms and conditions negotiation",
      "Contract acceptance and signing"
    ],
    tips: [
      "Consider all terms, not just price",
      "Verify buyer's financing pre-approval",
      "Quick response shows seller motivation"
    ]
  },
  {
    number: 7,
    title: "Navigate Inspections",
    timeframe: "1-2 weeks",
    description: "Manage the inspection process and negotiate any repair requests to keep the sale on track.",
    details: [
      "Inspection scheduling and coordination",
      "Report review and analysis",
      "Repair negotiation strategy",
      "Contractor coordination if needed",
      "Re-inspection management"
    ],
    tips: [
      "Address major issues before listing when possible",
      "Be prepared to negotiate on inspection items",
      "Quick responses keep transactions moving"
    ]
  },
  {
    number: 8,
    title: "Complete the Sale",
    timeframe: "2-4 weeks",
    description: "Navigate the final steps from appraisal through closing to successfully transfer ownership.",
    details: [
      "Appraisal coordination and review",
      "Final walkthrough preparation",
      "Closing document preparation",
      "Utility transfer coordination",
      "Key and garage remote handover"
    ],
    tips: [
      "Keep property in same condition as when sold",
      "Be present for final walkthrough if possible",
      "Have all warranties and manuals ready for buyer"
    ]
  }
];

const requiredDocs = [
  "Property deed and title information",
  "Property tax records (last 2 years)",
  "Homeowners insurance policy",
  "HOA documentation and fees",
  "Property surveys and plot plans",
  "Warranty information for appliances/systems",
  "Utility bills (last 12 months)",
  "Home improvement receipts and permits",
  "Property disclosure forms",
  "Lead paint disclosure (if built before 1978)"
];

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Listing Process Checklist - 4Seasons Real Estate</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #0d0d33;
            padding-bottom: 20px;
        }
        
        .logo {
            width: 120px;
            height: auto;
            margin-bottom: 15px;
        }
        
        .title {
            color: #0d0d33;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .subtitle {
            color: #666;
            font-size: 16px;
            margin-bottom: 5px;
        }
        
        .intro {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 4px solid #0d0d33;
        }
        
        .step {
            margin-bottom: 25px;
            break-inside: avoid;
        }
        
        .step-header {
            background: #0d0d33;
            color: white;
            padding: 15px 20px;
            border-radius: 8px 8px 0 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .step-number {
            background: white;
            color: #0d0d33;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 18px;
        }
        
        .step-title {
            font-size: 20px;
            font-weight: bold;
            flex: 1;
            margin-left: 15px;
        }
        
        .step-timeframe {
            background: rgba(255,255,255,0.2);
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 14px;
        }
        
        .step-content {
            background: white;
            border: 2px solid #0d0d33;
            border-top: none;
            padding: 20px;
            border-radius: 0 0 8px 8px;
        }
        
        .step-description {
            margin-bottom: 15px;
            color: #555;
            font-style: italic;
        }
        
        .activities-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 15px;
        }
        
        .section-title {
            font-weight: bold;
            color: #0d0d33;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .checklist-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .checkbox {
            width: 16px;
            height: 16px;
            border: 2px solid #0d0d33;
            border-radius: 3px;
            margin-right: 10px;
            margin-top: 2px;
            flex-shrink: 0;
        }
        
        .tip-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .tip-bullet {
            width: 8px;
            height: 8px;
            background: #0d0d33;
            border-radius: 50%;
            margin-right: 10px;
            margin-top: 6px;
            flex-shrink: 0;
        }
        
        .docs-section {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
            border: 2px solid #0d0d33;
        }
        
        .docs-title {
            color: #0d0d33;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .docs-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        
        .cost-section {
            background: #f0f8ff;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
            border: 2px solid #0d0d33;
        }
        
        .cost-title {
            color: #0d0d33;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .cost-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 15px;
        }
        
        .cost-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #ddd;
        }
        
        .cost-percentage {
            font-size: 20px;
            font-weight: bold;
            color: #0d0d33;
            margin-bottom: 5px;
        }
        
        .cost-label {
            font-size: 14px;
            color: #666;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #0d0d33;
            text-align: center;
            color: #666;
        }
        
        .contact-info {
            margin-bottom: 15px;
        }
        
        .contact-title {
            color: #0d0d33;
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 10px;
        }
        
        .website {
            color: #0d0d33;
            font-weight: bold;
            font-size: 16px;
        }
        
        @media print {
            .step {
                page-break-inside: avoid;
            }
            
            .docs-section, .cost-section {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="title">Home Listing Process Checklist</div>
            <div class="subtitle">Your Complete Guide to Selling in North Texas</div>
            <div class="subtitle">4Seasons Real Estate</div>
        </div>
        
        <div class="intro">
            <p><strong>Welcome to your comprehensive home listing checklist!</strong> This guide covers the complete 8-step process to successfully list and sell your property in the Dallas-Fort Worth area. Each step includes actionable items and professional tips to maximize your home's value and minimize time on market.</p>
        </div>

        ${listingSteps.map(step => `
            <div class="step">
                <div class="step-header">
                    <div class="step-number">${step.number}</div>
                    <div class="step-title">${step.title}</div>
                    <div class="step-timeframe">${step.timeframe}</div>
                </div>
                <div class="step-content">
                    <div class="step-description">${step.description}</div>
                    <div class="activities-section">
                        <div>
                            <div class="section-title">Key Activities:</div>
                            ${step.details.map(detail => `
                                <div class="checklist-item">
                                    <div class="checkbox"></div>
                                    <span>${detail}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div>
                            <div class="section-title">Pro Tips:</div>
                            ${step.tips.map(tip => `
                                <div class="tip-item">
                                    <div class="tip-bullet"></div>
                                    <span>${tip}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('')}

        <div class="docs-section">
            <div class="docs-title">Required Documentation Checklist</div>
            <p style="text-align: center; margin-bottom: 20px; color: #666;">
                Gather these documents early to streamline your listing process
            </p>
            <div class="docs-grid">
                ${requiredDocs.map(doc => `
                    <div class="checklist-item">
                        <div class="checkbox"></div>
                        <span>${doc}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="cost-section">
            <div class="cost-title">Estimated Selling Costs</div>
            <p style="text-align: center; margin-bottom: 15px; color: #666;">
                Plan for these typical costs as a percentage of your sale price
            </p>
            <div class="cost-grid">
                <div class="cost-item">
                    <div class="cost-percentage">5-6%</div>
                    <div class="cost-label">Real Estate Commission</div>
                </div>
                <div class="cost-item">
                    <div class="cost-percentage">1-2%</div>
                    <div class="cost-label">Closing Costs</div>
                </div>
                <div class="cost-item">
                    <div class="cost-percentage">1-3%</div>
                    <div class="cost-label">Preparation Costs</div>
                </div>
                <div class="cost-item">
                    <div class="cost-percentage">7-11%</div>
                    <div class="cost-label">Total Estimated</div>
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="contact-info">
                <div class="contact-title">Ready to Get Started?</div>
                <p>Contact 4Seasons Real Estate for a personalized listing consultation</p>
                <p>We'll guide you through every step of the process to maximize your property value.</p>
            </div>
            <div class="website">www.4seasonsrealestate.com</div>
            <p style="margin-top: 10px; font-size: 12px; color: #999;">
                © ${new Date().getFullYear()} 4Seasons Real Estate - Your North Texas Property Experts
            </p>
        </div>
    </div>
</body>
</html>
`;

async function generatePDF() {
  try {
    console.log('🚀 Starting PDF generation...');
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set content
    await page.setContent(htmlTemplate, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Generate PDF
    const pdfDir = path.join(__dirname, '..', 'client', 'public', 'pdfs');
    const pdfPath = path.join(pdfDir, 'home-listing-process-checklist.pdf');
    
    // Ensure directory exists
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      printBackground: true,
      preferCSSPageSize: true
    });
    
    await browser.close();
    
    console.log('✅ PDF generated successfully:', pdfPath);
    return pdfPath;
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePDF().catch(console.error);
}

export { generatePDF };