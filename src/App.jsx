import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  RefreshCw,
  Users,
  Megaphone,
  Monitor,
  BarChart3,
  HelpCircle,
  Settings,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  CheckCircle,
  FileText,
  Truck,
  RotateCcw,
  Sliders,
  DollarSign,
  TrendingUp,
  Percent,
  MapPin,
  Clock,
  Sparkles,
  Shield,
  Send,
  AlertTriangle,
  Download,
  Upload,
  Heart,
  Share2,
  Printer,
  Copy,
  Zap,
  Star,
  Check,
  X,
  Globe,
  Database,
  BellOff,
  LogOut
} from 'lucide-react';

// ==========================================
// MOCK DATA INITIALIZATION & CONSTANTS
// ==========================================

const INITIAL_PRODUCTS = [
  { id: 'prod-001', title: 'Perfora Sonic Rechargeable Electric Toothbrush (Ocean Blue)', category: 'Brush', price: 1499, salePrice: 1149, cost: 450, sku: 'PF-ETB-BLU', inventory: 145, rating: 4.8, status: 'active', featured: true, description: 'Premium rechargeable sonic electric toothbrush with 2-minute timer.', tags: ['Featured', 'Bestseller'] },
  { id: 'prod-002', title: 'Perfora Dream White Toothpaste (Pack of 2 - 80g x 2)', category: 'Toothpaste', price: 299, salePrice: 249, cost: 95, sku: 'PF-TP-DREAM', inventory: 320, rating: 4.9, status: 'active', featured: true, description: 'Enamel safe, stain removing white formula. Dual tube pack.', tags: ['Bestseller'] },
  { id: 'prod-003', title: 'Perfora Purple Whitening Teeth Serum (30ml)', category: 'Whitening', price: 499, salePrice: 449, cost: 140, sku: 'PF-SERUM-PUR', inventory: 180, rating: 4.8, status: 'active', featured: true, description: 'Enamel safe instant color corrector purple shade serum.', tags: ['New Arrival', 'Bestseller'] },
  { id: 'prod-004', title: 'Perfora Awake & Unwind Mouthwash Combo (250ml x 2)', category: 'Mouthwash', price: 599, salePrice: 499, cost: 190, sku: 'PF-MW-COMBO', inventory: 95, rating: 4.7, status: 'active', featured: false, description: 'Alcohol-free probiotic mouthwashes for day & night fresh breath.', tags: ['Bestseller'] },
  { id: 'prod-005', title: 'Perfora Pro Power Water Dental Flosser', category: 'Flosser', price: 2999, salePrice: 2399, cost: 950, sku: 'PF-FL-WTR', inventory: 60, rating: 4.5, status: 'active', featured: true, description: 'High-pressure water flosser for deep interdental clean.', tags: ['Featured'] },
  { id: 'prod-006', title: 'Perfora Pure Solid Copper Tongue Cleaner', category: 'Accessories', price: 199, salePrice: 129, cost: 35, sku: 'PF-TC-COPPER', inventory: 240, rating: 4.9, status: 'active', featured: false, description: 'Earthy 100% solid copper anti-bacterial tongue scraper.', tags: ['Featured'] },
  { id: 'prod-007', title: 'Perfora Teeth Whitening Strips (14-pack)', category: 'Whitening', price: 999, salePrice: 799, cost: 260, sku: 'PF-STRIPS-14', inventory: 150, rating: 4.6, status: 'active', featured: false, description: 'Enamel safe instant shade correcting whitening strips pack.', tags: ['New Arrival'] },
  { id: 'prod-008', title: 'Dream White Paste & Purple Serum Combo Pack', category: 'Bundles', price: 798, salePrice: 599, cost: 230, sku: 'PF-WHITEN-COMBO', inventory: 110, rating: 4.9, status: 'active', featured: true, description: 'Ultimate shade correct and polish whitening bundle.', tags: ['Bestseller'] }
];

const INITIAL_ORDERS = [
  { id: 'P20261093270', customer: 'Ayush Goel', email: 'ayush@gmail.com', phone: '+91 98765 43210', items: 'Perfora Electric Toothbrush M001 (Ocean Blue) x1', total: 799, status: 'delivered', paymentStatus: 'paid', date: '2026-05-24T12:30:00Z', address: 'B-402, Raheja Heights, Malad East, Mumbai, 400097', paymentMethod: 'UPI', awb: 'AWB-88392019', warehouse: 'Mumbai' },
  { id: 'P20261093271', customer: 'Priya Sharma', email: 'priya.s@yahoo.com', phone: '+91 87654 32109', items: 'Perfora Dream White Toothpaste x2, Purple Whitening Serum x1', total: 897, status: 'shipped', paymentStatus: 'paid', date: '2026-05-24T14:45:00Z', address: 'Flat 101, Lotus Apts, Jubilee Hills, Hyderabad, 500033', paymentMethod: 'Card', awb: 'AWB-99882210', warehouse: 'Bangalore' },
  { id: 'P20261093272', customer: 'Rohan Mehra', email: 'rohan.mehra@outlook.com', phone: '+91 76543 21098', items: 'Teeth Whitening Strips x1', total: 799, status: 'pending', paymentStatus: 'unpaid', date: '2026-05-24T17:15:00Z', address: 'H.No. 54, Sector 15-A, Noida, UP, 201301', paymentMethod: 'COD', awb: '', warehouse: 'Delhi' },
  { id: 'P20261093273', customer: 'Ananya Iyer', email: 'ananya@live.com', phone: '+91 91234 56789', items: 'Dream White Paste & Purple Serum Combo x1', total: 599, status: 'pending', paymentStatus: 'paid', date: '2026-05-24T17:50:00Z', address: '23, 4th Cross, Malleshwaram, Bangalore, 560003', paymentMethod: 'UPI', awb: '', warehouse: 'Bangalore' }
];

const INITIAL_SUBSCRIPTIONS = [
  { id: 'SUB-9871', customer: 'Sneha Patel', product: 'Brush Head Refills (Every 2 Months)', nextBilling: '2026-06-15', frequency: '2 Months', status: 'active', mrr: 199 },
  { id: 'SUB-9872', customer: 'Kabir Kapoor', product: 'Perfora Truthpaste (Charcoal - Every Month)', nextBilling: '2026-06-02', frequency: '1 Month', status: 'active', mrr: 249 },
  { id: 'SUB-9873', customer: 'Vikram Singh', product: 'Complete Refill Box (Every 3 Months)', nextBilling: '2026-07-10', frequency: '3 Months', status: 'paused', mrr: 399 }
];

const INITIAL_CUSTOMERS = [
  { id: 'cust-101', name: 'Ayush Goel', email: 'ayush@gmail.com', phone: '+91 98765 43210', ordersCount: 5, ltv: 3995, credit: 150, rating: 5, tags: ['VIP', 'Active'] },
  { id: 'cust-102', name: 'Priya Sharma', email: 'priya.s@yahoo.com', phone: '+91 87654 32109', ordersCount: 3, ltv: 2391, credit: 0, rating: 4, tags: ['Active'] },
  { id: 'cust-103', name: 'Rohan Mehra', email: 'rohan.mehra@outlook.com', phone: '+91 76543 21098', ordersCount: 1, ltv: 349, credit: 50, rating: 5, tags: ['New'] },
  { id: 'cust-104', name: 'Ananya Iyer', email: 'ananya@live.com', phone: '+91 91234 56789', ordersCount: 2, ltv: 2598, credit: 0, rating: 4, tags: ['Active'] }
];

const INITIAL_DISCOUNTS = [
  { code: 'SMILE20', type: 'Percentage', value: 20, minSpend: 500, usageLimit: 1000, usages: 421, status: 'active' },
  { code: 'FREESHIP', type: 'Free Shipping', value: 0, minSpend: 299, usageLimit: 5000, usages: 1982, status: 'active' },
  { code: 'PERFORAKIT', type: 'Flat Amount', value: 150, minSpend: 1000, usageLimit: 500, usages: 120, status: 'active' }
];

const INITIAL_TICKETS = [
  { id: 'TCK-401', customer: 'Kabir Kapoor', subject: 'Water flosser pressure feels too high', priority: 'medium', status: 'open', date: '2026-05-24T16:00:00Z', messages: [{ sender: 'customer', text: 'Hey, I just bought the pro flosser. The water jet pressure is a bit high. Any tips on how to start?' }] },
  { id: 'TCK-402', customer: 'Sneha Patel', subject: 'Need to delay my subscription delivery', priority: 'low', status: 'pending', date: '2026-05-24T15:20:00Z', messages: [{ sender: 'customer', text: 'Hi support team, I have unused paste left. Can we push next month delivery by 15 days?' }] }
];

const INDIAN_CITIES = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Kolkata', 'Chennai', 'Jaipur', 'Ahmedabad', 'Chandigarh'];
const VISITOR_FIRST_NAMES = ['Aarav', 'Vihaan', 'Aditya', 'Sai', 'Ishaan', 'Rahul', 'Neha', 'Riya', 'Kiara', 'Anya', 'Dev', 'Arjun', 'Tanvi', 'Siddharth', 'Pranav'];
const VISITOR_LAST_NAMES = ['Mehta', 'Sharma', 'Patel', 'Reddy', 'Iyer', 'Gupta', 'Joshi', 'Chawla', 'Verma', 'Kapoor', 'Rao', 'Bose', 'Deshmukh'];
const LOGIN_TERMINATED_MESSAGE = 'You have hit too many requests. Your account has been terminated. Please contact Dev. Nitin Sharma.';

const INITIAL_STAFF = [
  { id: 1, name: 'Jatan Bawa', role: 'Co-Founder & CEO (Absolute Master Operations Head)', type: 'Master' },
  { id: 2, name: 'Tushar Khurana', role: 'Co-Founder & COO (Full Brand Operations & Logistics Head)', type: 'Master' },
  { id: 3, name: 'Aman Shukla', role: 'Lead D2C Architect (CMS styling, products CRUD, warehouse nodes, DB backups)', type: 'Admin' },
  { id: 4, name: 'Neha Gupta', role: 'Marketing Manager (Can view orders, write coupons)', type: 'Marketing' },
  { id: 5, name: 'Tanvi Joshi', role: 'Support Lead (Read tickets, override support bot)', type: 'Support' },
  { id: 6, name: 'Rajesh Mishra', role: 'Warehouse Manager (Logistics splits, stock PO approvals)', type: 'Logistics' },
  { id: 7, name: 'Sunita Rao', role: 'Fulfillment Lead (AWB generation & carrier dispatches)', type: 'Logistics' },
  { id: 8, name: 'Vikram Deshmukh', role: 'SEO Specialist (URL tracking & sitemaps indexing)', type: 'Marketing' },
  { id: 9, name: 'Ishita Singhal', role: 'Lead Formulation Scientist (Oral Care R&D & Quality Standards)', type: 'R&D' },
  { id: 10, name: 'Kavya Reddy', role: 'Logistics Coordinator (Delhivery Courier API integration & splits)', type: 'Logistics' },
  { id: 11, name: 'Ritu Sen', role: 'Subscription Growth Analyst (Dunning retry & MRR retention metrics)', type: 'Finance' },
  { id: 12, name: 'Pooja Sharma', role: 'CX Specialist (Bot takeover & live shopper chat queues)', type: 'Support' },
  { id: 13, name: 'Anjali Verma', role: 'Paid Media Lead (Meta & Google Ads Campaign Manager)', type: 'Marketing' },
  { id: 14, name: 'Priyanka Nair', role: 'Creative Director (UI/UX Assets & Product Renderings)', type: 'Design' },
  { id: 15, name: 'Meera Iyer', role: 'Finance Controller (GST Tax Invoicing & Bank Reconciliation)', type: 'Finance' },
  { id: 16, name: 'Deepa Chawla', role: 'Retention Specialist (Newsletter Campaigns & Automated CRM flows)', type: 'Marketing' },
  { id: 17, name: 'Shalini Kulkarni', role: 'Brand Strategist (PR & Influencer Outreach Operations)', type: 'Marketing' },
  { id: 18, name: 'Rohan Kapoor', role: 'DevOps Engineer (Redis Cache Tuning & API Latency Controls)', type: 'Tech' },
  { id: 19, name: 'Karan Grover', role: 'Inventory Controller (Stock PO Replenishments & Vendor Coordination)', type: 'Logistics' },
  { id: 20, name: 'Swati Saxena', role: 'Affiliate Manager (Creator Referrals & Commission Payouts)', type: 'Marketing' },
  { id: 21, name: 'Aditi Patel', role: 'Loyalty Specialist (Store Credit Rewards & Referral Bonuses)', type: 'Support' },
  { id: 22, name: 'Nisha Deshmukh', role: 'Data Analyst (Funnel Drop-offs & Conversion Rate Optimization)', type: 'Tech' },
  { id: 23, name: 'Rhea Sen', role: 'Community Manager (Oral Hygiene Forums & Support Wiki)', type: 'Support' },
  { id: 24, name: 'Sneha Ganguly', role: 'Performance Marketer (SEM, Keyword CPC & Retargeting)', type: 'Marketing' },
  { id: 25, name: 'Divya Hegde', role: 'Procurement Specialist (Eco-friendly raw materials & toothbrush filament)', type: 'Logistics' },
  { id: 26, name: 'Kriti Bhalla', role: 'Email Marketing Lead (Klaviyo Sync & Automated Abandoned Cart SMS)', type: 'Marketing' },
  { id: 27, name: 'Aisha Rahman', role: 'Customer Happiness Lead (COD Secure OTP Verification Auditor)', type: 'Support' },
  { id: 28, name: 'Ridhi Malhotra', role: 'Visual Designer (Shopify CMS Theming & Custom Landing Pages)', type: 'Design' },
  { id: 29, name: 'Meghana Reddy', role: 'Regional Warehouse Manager (South India Hub, Bangalore)', type: 'Logistics' },
  { id: 30, name: 'Sakshi Pandey', role: 'Regional Warehouse Manager (North India Hub, Delhi)', type: 'Logistics' },
  { id: 31, name: 'Harini Srinivasan', role: 'Regional Warehouse Manager (West India Hub, Mumbai)', type: 'Logistics' },
  { id: 32, name: 'Prerna Kapoor', role: 'HR Operations Head (Internal Ops, Performance & Talent Acquisition)', type: 'HR' },
  { id: 33, name: 'Sanjana Singh', role: 'CRM Manager (Customer Lifecycle, Segmentations & LTV Optimization)', type: 'Marketing' },
  { id: 34, name: 'Richa Goel', role: 'Merchandising Specialist (Pricing Tiers, Bundles & Bestseller Stars)', type: 'Marketing' },
  { id: 35, name: 'Nandini Sen', role: 'Billing Support Admin (Razorpay Gateway Sync & Disputed Refund Ledger)', type: 'Finance' },
  { id: 36, name: 'Arjun Singhania', role: 'Security Admin (IP Whitelists, Cloudflare Firewalls & 2FA Tokens)', type: 'Tech' },
  { id: 37, name: 'Simran Kaur', role: 'Influencer Coordinator (Affiliate Links, Creator Gifting & Seeding)', type: 'Marketing' },
  { id: 38, name: 'Gauri Kelkar', role: 'Copywriter (Oral Health Guides, SEO FAQ Rich Snippets)', type: 'Marketing' },
  { id: 39, name: 'Bhavna Shah', role: 'Tax Compliance Auditor (HSN Codes, SGST/CGST Domestic Returns)', type: 'Finance' },
  { id: 40, name: 'Nupur Sharma', role: 'Product Manager (Cart, One-Click Checkout & UX Flows)', type: 'Tech' }
];

const INITIAL_AUDIT_LOGS = [
  { timestamp: '06:12:45 PM', staffName: 'Aman Shukla', staffRole: 'Lead D2C Architect', action: 'Config Saved', details: 'Persisted global settings variables and authorized Razorpay gateways.', ip: '103.44.89.21' },
  { timestamp: '06:08:20 PM', staffName: 'Rajesh Mishra', staffRole: 'Warehouse Manager', action: 'Order Prepaid', details: 'Marked order P20261093270 as prepaid (captured ₹799 UPI settlement).', ip: '192.168.1.14' },
  { timestamp: '05:54:11 PM', staffName: 'Sakshi Pandey', staffRole: 'Regional Warehouse Manager (North Delhi)', action: 'AWB Generated', details: 'Generated Delhivery manifest AWB-88392019 for order P20261093270.', ip: '103.88.22.41' },
  { timestamp: '05:42:05 PM', staffName: 'Neha Gupta', staffRole: 'Marketing Manager', action: 'Coupon Created', details: 'Created coupon code ORALCARE20 (20% percentage discount, spend min ₹500).', ip: '192.168.1.102' },
  { timestamp: '05:30:18 PM', staffName: 'Tushar Khurana', staffRole: 'Co-Founder & COO', action: 'Stock Restock', details: 'Restocked Perfora Pro Power Water Dental Flosser (+250 units in Delhi WH node).', ip: '103.44.89.21' },
  { timestamp: '05:22:50 PM', staffName: 'Kavya Reddy', staffRole: 'Logistics Coordinator', action: 'Order Re-routing', details: 'Re-routed order P20261093272 from Delhi WH to Mumbai WH node due to local pincode block.', ip: '192.168.1.48' },
  { timestamp: '05:15:33 PM', staffName: 'Swati Saxena', staffRole: 'Affiliate Manager', action: 'Campaign Settled', details: 'Authorized influencer campaign payout of ₹15,400 to Rhea Sen.', ip: '192.168.1.201' },
  { timestamp: '04:58:12 PM', staffName: 'Arjun Singhania', staffRole: 'Security Admin', action: 'Security Audit', details: 'Updated IP Whitelist filter parameters. Added 103.44.89.21 to authorized pool.', ip: '103.44.89.25' },
  { timestamp: '04:42:01 PM', staffName: 'Harini Srinivasan', staffRole: 'Regional Warehouse Manager (Mumbai)', action: 'DB Backup', details: 'Initiated secure cloud database snapshot tarball (DB-20260524-1845.tar.gz).', ip: '192.168.1.91' },
  { timestamp: '04:30:45 PM', staffName: 'Ishita Singhal', staffRole: 'Lead Formulation Scientist', action: 'Formula Update', details: 'Approved FDA compliance certificate upload for Perfora Purple Whitening Serum.', ip: '192.168.1.77' },
  { timestamp: '04:12:00 PM', staffName: 'Tanvi Joshi', staffRole: 'Support Lead', action: 'Ticket Answered', details: 'Escalated TCK-401 (Water flosser pressure feels too high) to tech engineering team.', ip: '192.168.1.15' },
  { timestamp: '03:55:18 PM', staffName: 'Ritu Sen', staffRole: 'Subscription Growth Analyst', action: 'Dunning Trigger', details: 'Triggered automated SMS notification for paused D2C subscription SUB-9873.', ip: '192.168.1.134' },
  { timestamp: '03:40:22 PM', staffName: 'Sunita Rao', staffRole: 'Fulfillment Lead', action: 'Dispatch Sync', details: 'Transmitted shipment data for 142 packages to Delhivery API endpoint.', ip: '192.168.1.86' },
  { timestamp: '03:15:09 PM', staffName: 'Vikram Deshmukh', staffRole: 'SEO Specialist', action: 'SEO Indexing', details: 'Submitted updated XML sitemap for Teeth Whitening Strips landing page to Search Console.', ip: '192.168.1.41' },
  { timestamp: '02:50:33 PM', staffName: 'Anjali Verma', staffRole: 'Paid Media Lead', action: 'Ads Optimise', details: 'Increased target CPA budget for Perfora Purple Whitening Serum on Meta Ads (+₹5000/day).', ip: '192.168.1.107' },
  { timestamp: '02:30:00 PM', staffName: 'Priyanka Nair', staffRole: 'Creative Director', action: 'Asset Upload', details: 'Uploaded new ultra-premium product renders for Awake & Unwind Mouthwash Combo.', ip: '192.168.1.92' },
  { timestamp: '02:08:44 PM', staffName: 'Meera Iyer', staffRole: 'Finance Controller', action: 'Tax Filing', details: 'Generated GSTR-1 domestic sales tax return log summary for Q1 reconciliation.', ip: '192.168.1.66' },
  { timestamp: '01:50:12 PM', staffName: 'Deepa Chawla', staffRole: 'Retention Specialist', action: 'Email Dispatch', details: 'Launched email newsletter "Unlock 10-Shades Brighter Smiles" to 142,000 subscribers.', ip: '192.168.1.53' },
  { timestamp: '01:30:05 PM', staffName: 'Shalini Kulkarni', staffRole: 'Brand Strategist', action: 'PR Dispatched', details: 'Dispatched custom co-branded gift boxes to 25 verified dental influencers.', ip: '192.168.1.72' },
  { timestamp: '01:05:41 PM', staffName: 'Rohan Kapoor', staffRole: 'DevOps Engineer', action: 'Cache Cleared', details: 'Flushed cached API responses for product inventory nodes in Redis instance.', ip: '192.168.1.34' },
  { timestamp: '12:45:10 PM', staffName: 'Karan Grover', staffRole: 'Inventory Controller', action: 'PO Raised', details: 'Raised purchase order PO-88392 for charcoal-infused nylon toothbrush filaments.', ip: '192.168.1.121' },
  { timestamp: '12:20:18 PM', staffName: 'Aditi Patel', staffRole: 'Loyalty Specialist', action: 'Credit Refund', details: 'Added ₹150 loyalty store credit to customer Ayush Goel for referral payout.', ip: '192.168.1.144' },
  { timestamp: '11:58:33 PM', staffName: 'Nisha Deshmukh', staffRole: 'Data Analyst', action: 'Funnel Audit', details: 'Analyzed checkout drop-off rates on cart page. Re-routed checkout ports.', ip: '192.168.1.111' },
  { timestamp: '11:35:12 PM', staffName: 'Rhea Sen', staffRole: 'Community Manager', action: 'Wiki Updated', details: 'Added new FAQ article "How to clean water dental flosser nozzle tips".', ip: '192.168.1.189' },
  { timestamp: '11:10:45 AM', staffName: 'Sneha Ganguly', staffRole: 'Performance Marketer', action: 'CPC Altered', details: 'Altered Google Search keywords targeting CPC bid cap to ₹42.00.', ip: '192.168.1.139' },
  { timestamp: '10:50:22 AM', staffName: 'Divya Hegde', staffRole: 'Procurement Specialist', action: 'Vendor Sync', details: 'Approved new eco-friendly copper wire filament supplier details.', ip: '192.168.1.182' },
  { timestamp: '10:30:12 AM', staffName: 'Kriti Bhalla', staffRole: 'Email Marketing Lead', action: 'SMS Automation', details: 'Configured Klaviyo flows to trigger automatic SMS after 30 minutes of cart abandonment.', ip: '192.168.1.205' },
  { timestamp: '10:10:05 AM', staffName: 'Aisha Rahman', staffRole: 'Customer Happiness Lead', action: 'OTP Verification', details: 'Authorized manually overridden verification for flagged high-value COD order.', ip: '192.168.1.147' },
  { timestamp: '09:50:33 AM', staffName: 'Ridhi Malhotra', staffRole: 'Visual Designer', action: 'CMS Published', details: 'Published updated homepage hero banner announcing summer discount sale.', ip: '192.168.1.166' },
  { timestamp: '09:30:12 AM', staffName: 'Meghana Reddy', staffRole: 'Regional Warehouse Manager (South)', action: 'Stock Transfer', details: 'Authorized stock transfer of 1,000 toothpaste units to Mumbai warehouse.', ip: '192.168.1.129' },
  { timestamp: '09:12:45 AM', staffName: 'Sakshi Pandey', staffRole: 'Regional Warehouse Manager (North)', action: 'Stock Ingress', details: 'Logged ingress of 4,000 electric toothbrushes into Delhi central warehouse.', ip: '103.88.22.41' },
  { timestamp: '08:50:20 AM', staffName: 'Prerna Kapoor', staffRole: 'HR Operations Head', action: 'HR Action', details: 'Granted developer console authorization tokens to system engineers.', ip: '192.168.1.233' },
  { timestamp: '08:30:11 AM', staffName: 'Sanjana Singh', staffRole: 'CRM Manager', action: 'CRM Segment', details: 'Compiled LTV segmentation list of VIP purchasers with more than 3 lifetime orders.', ip: '192.168.1.214' },
  { timestamp: '08:15:05 AM', staffName: 'Richa Goel', staffRole: 'Merchandising Specialist', action: 'Bestseller Star', details: 'Added bestseller star tags to Perfora Purple Whitening Teeth Serum.', ip: '192.168.1.242' },
  { timestamp: '07:55:18 AM', staffName: 'Nandini Sen', staffRole: 'Billing Support Admin', action: 'Gateway Refund', details: 'Settled disputed refund case for order P20261093255 (amount ₹499).', ip: '192.168.1.248' }
];

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('perfora_logged_in') === 'true');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(LOGIN_TERMINATED_MESSAGE);

  // Navigation & Layout UI States
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('perfora_theme') || 'light');
  const [globalSearch, setGlobalSearch] = useState('');
  const [storePreviewOpen, setStorePreviewOpen] = useState(false);

  // Global Core State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTIONS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [discounts, setDiscounts] = useState(INITIAL_DISCOUNTS);
  const [supportTickets, setSupportTickets] = useState(INITIAL_TICKETS);
  const [staffList, setStaffList] = useState(INITIAL_STAFF);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Busy Dashboard & SEO States
  const [totalOrderCount, setTotalOrderCount] = useState(1048591);
  const [totalSalesCount, setTotalSalesCount] = useState(82498400);
  const [seoTraffic, setSeoTraffic] = useState(450000);

  // Sub-states & UI Elements
  const [toDos, setToDos] = useState([
    { id: 1, text: 'Confirm COD order ORD-5493 via OTP check', completed: false, assigned: 'Ops Lead' },
    { id: 2, text: 'Create sitemap for Google Search Console', completed: false, assigned: 'SEO Admin' },
    { id: 3, text: 'Authorize pending return request from PRIYA SHARMA', completed: true, assigned: 'Support' }
  ]);
  const [newTodoText, setNewTodoText] = useState('');
  const [todoAssignee, setTodoAssignee] = useState('Ops Lead');
  
  // Simulated Analytics Values
  const [liveVisitors, setLiveVisitors] = useState(187);
  const [serverCPU, setServerCPU] = useState(68);
  const [serverRAM, setServerRAM] = useState(72);
  const [toasts, setToasts] = useState([]);
  const [muteOrderToasts, setMuteOrderToasts] = useState(() => localStorage.getItem('perfora_mute_orders') === 'true');
  const [notiDropdownOpen, setNotiDropdownOpen] = useState(false);
  
  // Modals & Details State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [otpVerificationOpen, setOtpVerificationOpen] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const [createOrderModalOpen, setCreateOrderModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('perfora_logged_in') === 'true') {
      localStorage.removeItem('perfora_logged_in');
    }
    setIsLoggedIn(false);
    setLoginError(LOGIN_TERMINATED_MESSAGE);
  }, []);
  const [auditSearchQuery, setAuditSearchQuery] = useState('');
  const [auditStaffFilter, setAuditStaffFilter] = useState('all');
  const [auditActionFilter, setAuditActionFilter] = useState('all');
  const [newOrderForm, setNewOrderForm] = useState({
    customer: '',
    email: '',
    phone: '',
    productId: '',
    quantity: 1,
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    warehouse: 'Delhi',
    address: ''
  });
  const [createdOrderSuccessInfo, setCreatedOrderSuccessInfo] = useState(null);
  const [partnerReplenishments, setPartnerReplenishments] = useState([
    { id: 'REP-9901', partner: 'Blinkit', hub: 'Gurgaon Sector-45 Hub', product: 'Perfora Dream White Toothpaste (Pack of 2 - 80g x 2)', quantity: 450, source: 'Delhi WH', timestamp: '05:40 PM', status: 'delivered' },
    { id: 'REP-9902', partner: 'Zepto', hub: 'Bandra West Hub', product: 'Perfora Sonic Rechargeable Electric Toothbrush (Ocean Blue)', quantity: 150, source: 'Mumbai WH', timestamp: '04:15 PM', status: 'transit' },
    { id: 'REP-9903', partner: 'Swiggy Instamart', hub: 'Koramangala 4th Block Hub', product: 'Perfora Purple Whitening Teeth Serum (30ml)', quantity: 300, source: 'Bangalore WH', timestamp: '03:10 PM', status: 'transit' },
    { id: 'REP-9904', partner: 'Blinkit', hub: 'Noida Sector-62 Hub', product: 'Perfora Pure Solid Copper Tongue Cleaner', quantity: 200, source: 'Delhi WH', timestamp: '01:50 PM', status: 'delivered' },
    { id: 'REP-9905', partner: 'Amazon Fresh', hub: 'New Delhi Fulfilment Center', product: 'Perfora Awake & Unwind Mouthwash Combo (250ml x 2)', quantity: 600, source: 'Delhi WH', timestamp: '11:20 AM', status: 'delivered' }
  ]);
  const [dispatchForm, setDispatchForm] = useState({ partner: 'Blinkit', hub: 'Gurgaon Sector-45 Hub', productId: 'prod-002', quantity: 100, source: 'Delhi' });

  // Perfora Customizer State (Store live variables editor)
  const [brandColor, setBrandColor] = useState(() => localStorage.getItem('perfora_brand_color') || '#004F52');
  const [mintAccent, setMintAccent] = useState(() => localStorage.getItem('perfora_mint_accent') || '#A4D8D2');

  // Multi-Language panel
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem('perfora_lang') || 'English');

  // Security and Networks Panel States
  const [whitelistedIps, setWhitelistedIps] = useState(() => localStorage.getItem('perfora_whitelisted_ips') || '192.168.1.1, 103.44.89.21');
  const [razorpayGatewayEnabled, setRazorpayGatewayEnabled] = useState(() => localStorage.getItem('perfora_gateway_razorpay') !== 'false');
  const [stripeGatewayEnabled, setStripeGatewayEnabled] = useState(() => localStorage.getItem('perfora_gateway_stripe') === 'true');

  // Real-time Sound simulated by browser Audio Context
  const playPulseSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(660, audioCtx.currentTime); // A5 note
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.log('Audio contextual failure (user must interact first):', e);
    }
  };

  // Add a toast notification helper
  const addToast = (title, desc) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, desc }]);
    playPulseSound();
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Log audit helper
  const logAudit = (action, details, staffName = 'Aman Shukla', staffRole = 'Lead D2C Architect') => {
    setAuditLogs(prev => [
      { 
        timestamp: new Date().toLocaleTimeString(), 
        staffName, 
        staffRole, 
        action, 
        details, 
        ip: ['103.44.89.21', '192.168.1.14', '103.88.22.41', '192.168.1.102'][Math.floor(Math.random() * 4)] 
      },
      ...prev.slice(0, 149)
    ]);
  };

  // Simulated Orders background thread (Populating "orders apne aap aaye" requirement - FAST SPEED!)
  useEffect(() => {
    const orderInterval = setInterval(() => {
      // Choose a random product
      const randomProd = products[Math.floor(Math.random() * products.length)];
      // Choose random shopper details
      const firstName = VISITOR_FIRST_NAMES[Math.floor(Math.random() * VISITOR_FIRST_NAMES.length)];
      const lastName = VISITOR_LAST_NAMES[Math.floor(Math.random() * VISITOR_LAST_NAMES.length)];
      const customerName = `${firstName} ${lastName}`;
      const city = INDIAN_CITIES[Math.floor(Math.random() * INDIAN_CITIES.length)];
      
      const orderId = `P2026${Math.floor(1000000 + Math.random() * 9000000)}`;
      const totalAmount = randomProd.salePrice;
      const isCod = Math.random() > 0.4;
      const paymentMethod = isCod ? 'COD' : 'UPI';
      const paymentStatus = isCod ? 'unpaid' : 'paid';
      const address = `${Math.floor(10 + Math.random() * 190)}, Gold Plaza Road, ${city}, Pin ${Math.floor(100000 + Math.random() * 800000)}`;

      const newOrder = {
        id: orderId,
        customer: customerName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
        phone: `+91 ${Math.floor(60000 + Math.random() * 39999)} ${Math.floor(10000 + Math.random() * 89999)}`,
        items: `${randomProd.title} x1`,
        total: totalAmount,
        status: 'pending',
        paymentStatus,
        date: new Date().toISOString(),
        address,
        paymentMethod,
        awb: '',
        warehouse: ['Delhi', 'Mumbai', 'Bangalore'][Math.floor(Math.random() * 3)]
      };

      // 1. Add order & Cap array size to 120 elements to prevent DOM bloat and maintain blazing performance!
      setOrders(prev => [newOrder, ...prev].slice(0, 120));

      // 2. Increment counters live
      setTotalOrderCount(prev => prev + 1);
      setTotalSalesCount(prev => prev + totalAmount);

      // 3. Reduce inventory level
      setProducts(prevProducts => prevProducts.map(p => {
        if (p.id === randomProd.id) {
          return { ...p, inventory: Math.max(0, p.inventory - 1) };
        }
        return p;
      }));

      // 4. Update customer CRM metrics or add new customer profile
      setCustomers(prevCustomers => {
        const existing = prevCustomers.find(c => c.name === customerName);
        if (existing) {
          return prevCustomers.map(c => c.name === customerName ? {
            ...c,
            ordersCount: c.ordersCount + 1,
            ltv: c.ltv + totalAmount
          } : c);
        } else {
          return [
            {
              id: `cust-${Math.floor(105 + Math.random() * 900)}`,
              name: customerName,
              email: newOrder.email,
              phone: newOrder.phone,
              ordersCount: 1,
              ltv: totalAmount,
              credit: 0,
              rating: 5,
              tags: ['New']
            },
            ...prevCustomers.slice(0, 50)
          ];
        }
      });

      // 5. Update Toast notification if not muted
      if (!muteOrderToasts) {
        addToast(
          `🛍️ Real-time Order Placed!`, 
          `${customerName} bought ${randomProd.title} via ${paymentMethod} (${city})`
        );
      }

      // 6. Log audit trail entry
      logAudit('Automated Incoming Order', `Generated Order ${orderId} for ₹${totalAmount} from ${city}`, 'D2C Checkout Bot', 'Automated Shopify Webhook Sync');

    }, 4500); // 4.5 seconds interval for realistic and stable activity feed simulation!

    return () => clearInterval(orderInterval);
  }, [products, muteOrderToasts]);

  // Settings Storage Auto-Saver Observers
  useEffect(() => {
    localStorage.setItem('perfora_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('perfora_mute_orders', muteOrderToasts);
  }, [muteOrderToasts]);

  useEffect(() => {
    localStorage.setItem('perfora_lang', currentLang);
  }, [currentLang]);

  useEffect(() => {
    localStorage.setItem('perfora_brand_color', brandColor);
  }, [brandColor]);

  useEffect(() => {
    localStorage.setItem('perfora_mint_accent', mintAccent);
  }, [mintAccent]);

  useEffect(() => {
    localStorage.setItem('perfora_gateway_razorpay', razorpayGatewayEnabled);
  }, [razorpayGatewayEnabled]);

  useEffect(() => {
    localStorage.setItem('perfora_gateway_stripe', stripeGatewayEnabled);
  }, [stripeGatewayEnabled]);

  // Fluctuating Analytics Dashboard Widgets
  useEffect(() => {
    const dashboardTimer = setInterval(() => {
      setLiveVisitors(Math.floor(120 + Math.random() * 40));
      setServerCPU(Math.floor(15 + Math.random() * 20));
      setServerRAM(Math.floor(55 + Math.random() * 5));
    }, 4500);

    return () => clearInterval(dashboardTimer);
  }, []);

  // Sync brand CSS styles to root variables dynamically
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-teal', brandColor);
    // Simple conversion of hex to rgb
    const hex = brandColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    document.documentElement.style.setProperty('--primary-teal-rgb', `${r}, ${g}, ${b}`);
  }, [brandColor]);

  // Calculate global summary calculations
  const totalSales = orders.reduce((acc, curr) => curr.paymentStatus === 'paid' || curr.status === 'delivered' ? acc + curr.total : acc, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const lowStockCount = products.filter(p => p.inventory < 100).length;
  const activeSubsCount = subscriptions.filter(s => s.status === 'active').length;

  // Filter lists based on globalSearch
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(globalSearch.toLowerCase()) || 
    p.sku.toLowerCase().includes(globalSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(globalSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
    o.customer.toLowerCase().includes(globalSearch.toLowerCase()) ||
    o.items.toLowerCase().includes(globalSearch.toLowerCase()) ||
    o.warehouse.toLowerCase().includes(globalSearch.toLowerCase())
  );

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(globalSearch.toLowerCase()) ||
    c.phone.includes(globalSearch)
  );

  // Todo functions
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
      assigned: todoAssignee
    };
    setToDos(prev => [...prev, newTodo]);
    setNewTodoText('');
    logAudit('Created Dashboard Task', `Task: "${newTodo.text}" assigned to ${todoAssignee}`);
  };

  const handleToggleTodo = (id) => {
    setToDos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    logAudit('Updated Task Status', `Toggled completion state of task ID ${id}`);
  };

  const handleDeleteTodo = (id) => {
    setToDos(prev => prev.filter(t => t.id !== id));
    logAudit('Deleted Task', `Removed task ID ${id}`);
  };

  // Product CRUD
  const handleOpenAddProduct = () => {
    setEditingProduct({
      id: `prod-${Math.floor(100 + Math.random() * 900)}`,
      title: '',
      category: 'Brush',
      price: 0,
      salePrice: 0,
      cost: 0,
      sku: '',
      inventory: 100,
      status: 'active',
      description: '',
      tags: []
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const isNew = !products.some(p => p.id === editingProduct.id);
    if (isNew) {
      setProducts(prev => [editingProduct, ...prev]);
      addToast('📦 Product Added', `${editingProduct.title} added to store catalog successfully.`);
      logAudit('Product Added', `Created new catalog item ${editingProduct.sku}`);
    } else {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
      addToast('📦 Product Updated', `${editingProduct.title} metrics updated.`);
      logAudit('Product Updated', `Modified catalog item ${editingProduct.sku}`);
    }
    setProductModalOpen(false);
  };

  const handleDeleteProduct = (id, sku) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('🗑️ Product Deleted', `Item SKU: ${sku} deleted from catalog.`);
    logAudit('Product Deleted', `Removed catalog SKU ${sku}`);
  };

  const handleCloneProduct = (product) => {
    const cloned = {
      ...product,
      id: `prod-${Math.floor(100 + Math.random() * 900)}`,
      title: `${product.title} (Clone)`,
      sku: `${product.sku}-CLONE`
    };
    setProducts(prev => [cloned, ...prev]);
    addToast('📦 Product Cloned', `Cloned ${product.title} successfully.`);
    logAudit('Product Cloned', `Cloned catalog SKU ${product.sku}`);
  };

  const handleCreateBackendOrder = (e) => {
    e.preventDefault();
    const selProd = products.find(p => p.id === newOrderForm.productId) || products[0];
    const totalVal = selProd.salePrice * newOrderForm.quantity;
    const orderId = `P2026${Math.floor(1000000 + Math.random() * 9000000)}`;

    const newOrderObj = {
      id: orderId,
      customer: newOrderForm.customer,
      email: newOrderForm.email,
      phone: newOrderForm.phone,
      items: `${selProd.title} x${newOrderForm.quantity}`,
      total: totalVal,
      status: 'pending',
      paymentStatus: newOrderForm.paymentStatus,
      date: new Date().toISOString(),
      address: newOrderForm.address || 'Direct Backend Admin Counter checkout address',
      paymentMethod: newOrderForm.paymentMethod,
      awb: '',
      warehouse: newOrderForm.warehouse
    };

    // 1. Add order to state
    setOrders(prev => [newOrderObj, ...prev].slice(0, 120));

    // 2. Reduce catalog product stock
    setProducts(prev => prev.map(item => item.id === selProd.id ? { ...item, inventory: Math.max(0, item.inventory - newOrderForm.quantity) } : item));

    // 3. Increment counters
    setTotalOrderCount(prev => prev + 1);
    setTotalSalesCount(prev => prev + totalVal);

    // 4. Update customer list LTV
    setCustomers(prev => {
      const existing = prev.find(c => c.name === newOrderForm.customer);
      if (existing) {
        return prev.map(c => c.name === newOrderForm.customer ? {
          ...c,
          ordersCount: c.ordersCount + 1,
          ltv: c.ltv + totalVal
        } : c);
      } else {
        return [
          {
            id: `cust-${Math.floor(105 + Math.random() * 900)}`,
            name: newOrderForm.customer,
            email: newOrderForm.email,
            phone: newOrderForm.phone,
            ordersCount: 1,
            ltv: totalVal,
            credit: 0,
            rating: 5,
            tags: ['New']
          },
          ...prev.slice(0, 50)
        ];
      }
    });

    // 5. Toast popup & audit
    addToast('🛍️ Backend Order Created!', `Manual Order ${orderId} registered successfully for ₹${totalVal}.`);
    logAudit('Backend Order Created', `Aman Shukla created manual order ${orderId} for ${newOrderForm.customer}`);

    // 6. Set success popup info & Close creation modal
    setCreatedOrderSuccessInfo(newOrderObj);
    setCreateOrderModalOpen(false);

    // 7. Reset form
    setNewOrderForm({
      customer: '',
      email: '',
      phone: '',
      productId: '',
      quantity: 1,
      paymentMethod: 'UPI',
      paymentStatus: 'paid',
      warehouse: 'Delhi',
      address: ''
    });
  };

  // Order Actions
  const handleFulfillOrder = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const generatedAwb = `AWB-${Math.floor(10000000 + Math.random() * 90000000)}`;
        return { ...o, status: 'shipped', awb: generatedAwb };
      }
      return o;
    }));
    addToast('🚚 Order Shipped', `${orderId} marked as shipped and logistics notified.`);
    logAudit('Order Shipped', `Generated AWB for ${orderId}`, 'Sunita Rao', 'Fulfillment Lead');
  };

  const handleMarkAsPaid = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus: 'paid' } : o));
    addToast('💰 Order Payment Approved', `Manual settlement captured for ${orderId}.`);
    logAudit('Order Paid', `Manual payment check clear for ${orderId}`, 'Meera Iyer', 'Finance Controller');
  };

  const handleCancelOrder = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
    addToast('🚫 Order Cancelled', `${orderId} has been voided.`);
    logAudit('Order Cancelled', `Admin voided order ID ${orderId}`, 'Sakshi Pandey', 'Regional Warehouse Manager (North)');
  };

  const handleProcessRefund = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus: 'refunded', status: 'cancelled' } : o));
    addToast('💸 Refund Processed', `Store credit or bank settlement triggered for ${orderId}.`);
    logAudit('Order Refunded', `Initiated automated refund process for ${orderId}`, 'Nandini Sen', 'Billing Support Admin');
  };

  const triggerOtpCheck = (order) => {
    setSelectedOrder(order);
    setOtpVerificationOpen(true);
    setOtpTimer(60);
    // Simulate SMS sending
    addToast('💬 OTP Dispatched', `SMS verification code sent to customer phone ${order.phone}`);
  };

  const handleConfirmOtp = () => {
    if (enteredOtp === '1234' || enteredOtp === '9988' || enteredOtp.length === 4) {
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, items: `[VERIFIED COD] ${o.items}` } : o));
      addToast('✅ COD Verified', `Order ${selectedOrder.id} successfully verified via secure OTP.`);
      logAudit('COD Verified via OTP', `Verified phone check for order ${selectedOrder.id}`);
      setOtpVerificationOpen(false);
      setEnteredOtp('');
    } else {
      addToast('❌ Verification Failed', 'Entered OTP was incorrect. Please try again.');
    }
  };
  const handlePartnerDispatchSubmit = (e) => {
    e.preventDefault();
    const qty = parseInt(dispatchForm.quantity);
    if (!qty || qty <= 0) {
      addToast('⚠️ Invalid Quantity', 'Please enter a valid stock amount.');
      return;
    }

    const prod = products.find(p => p.id === dispatchForm.productId);
    if (!prod) return;

    if (prod.inventory < qty) {
      addToast('❌ Insufficient Inventory', `Only ${prod.inventory} units of ${prod.title} remaining in central pool.`);
      return;
    }

    setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, inventory: p.inventory - qty } : p));

    const newRep = {
      id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
      partner: dispatchForm.partner,
      hub: dispatchForm.hub,
      product: prod.title,
      quantity: qty,
      source: `${dispatchForm.source} WH`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'transit'
    };

    setPartnerReplenishments(prev => [newRep, ...prev]);
    logAudit('Partner Dispatch', `Dispatched ${qty} units of ${prod.title} from ${dispatchForm.source} WH to ${dispatchForm.partner} (${dispatchForm.hub})`, 'Aman Shukla', 'Lead D2C Architect');
    addToast('📦 Partner Dispatch Initiated!', `Stock transferred from ${dispatchForm.source} warehouse node directly to ${dispatchForm.partner} Hub.`);
  };
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #002e30 0%, #004F52 50%, #001f21 100%)',
        fontFamily: 'var(--font-sans)',
        padding: '25px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative lighting bubbles */}
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(164, 216, 210, 0.08)', filter: 'blur(80px)', top: '-50px', left: '-50px' }}></div>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(226, 135, 110, 0.05)', filter: 'blur(100px)', bottom: '-100px', right: '-100px' }}></div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '40px 32px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Logo brand icon */}
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'rgba(164, 216, 210, 0.1)', 
            color: '#A4D8D2', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: '16px',
            border: '1px solid rgba(164, 216, 210, 0.2)'
          }}>
            <Sparkles size={32} />
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '26px', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '2px', textAlign: 'center' }}>
            PERFORA
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', margin: '0 0 28px 0', textAlign: 'center', fontWeight: 500 }}>
            Lead D2C Architect Console
          </p>

          <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => {
            e.preventDefault();
            localStorage.removeItem('perfora_logged_in');
            setIsLoggedIn(false);
            setLoginError(LOGIN_TERMINATED_MESSAGE);
          }}>
            {loginError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#FCA5A5',
                fontSize: '12px',
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: 1.4
              }}>
                ⚠️ {loginError}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Admin Email Address
              </label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="Enter admin email address..."
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Master Key Password
              </label>
              <input
                type="password"
                required
                className="form-input"
                placeholder="Enter master password..."
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 700,
                marginTop: '12px',
                justifyContent: 'center',
                background: '#A4D8D2',
                color: '#004F52',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Secure Login & Sync
            </button>
          </form>

          <div style={{ marginTop: '24px', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>🔒 AES-256 Cloud Infrastructure protection active.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" data-theme={theme}>
      
      {/* ==========================================
          SIDEBAR NAVIGATION
          ========================================== */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Sparkles size={26} color={brandColor} />
            <span>PERFORA</span>
          </div>
          <button className="icon-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="sidebar-menu">
          <a className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={18} />
            <span>Overview & Live Feed</span>
          </a>
          <a className={`menu-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            <Package size={18} />
            <span>Catalog ({products.length})</span>
          </a>
          <a className={`menu-item ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>
            <Boxes size={18} />
            <span>Warehouse Inventory</span>
          </a>
          <a className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            <ShoppingCart size={18} />
            <span>Orders & AWBs ({pendingOrdersCount} pend)</span>
          </a>
          <a className={`menu-item ${activeTab === 'subscriptions' ? 'active' : ''}`} onClick={() => setActiveTab('subscriptions')}>
            <RefreshCw size={18} />
            <span>D2C Subscriptions</span>
          </a>
          <a className={`menu-item ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => setActiveTab('customers')}>
            <Users size={18} />
            <span>Customer CRM</span>
          </a>
          <a className={`menu-item ${activeTab === 'marketing' ? 'active' : ''}`} onClick={() => setActiveTab('marketing')}>
            <Megaphone size={18} />
            <span>Campaigns & SEO</span>
          </a>
          <a className={`menu-item ${activeTab === 'cms' ? 'active' : ''}`} onClick={() => setActiveTab('cms')}>
            <Monitor size={18} />
            <span>CMS Customizer</span>
          </a>
          <a className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <BarChart3 size={18} />
            <span>Advanced Reports</span>
          </a>
          <a className={`menu-item ${activeTab === 'support' ? 'active' : ''}`} onClick={() => setActiveTab('support')}>
            <HelpCircle size={18} />
            <span>Helpdesk & Chat</span>
          </a>
          <a className={`menu-item ${activeTab === 'audits' ? 'active' : ''}`} onClick={() => setActiveTab('audits')}>
            <Shield size={18} />
            <span>Security Audits</span>
          </a>
          <a className={`menu-item ${activeTab === 'partners' ? 'active' : ''}`} onClick={() => setActiveTab('partners')}>
            <Globe size={18} />
            <span>Q-Commerce Partners</span>
          </a>
          <a className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={18} />
            <span>Settings & Access</span>
          </a>
        </nav>

        <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="profile-widget" onClick={() => setActiveTab('settings')}>
            <div className="profile-avatar">AS</div>
            {!sidebarCollapsed && (
              <div className="profile-info" style={{ flexGrow: 1 }}>
                <span className="profile-name">Aman Shukla</span>
                <span className="profile-role" style={{ fontSize: '9px', lineHeight: 1.2 }}>Lead D2C Architect (CMS styling, products CRUD, warehouse nodes, DB backups)</span>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <button 
              className="btn-danger" 
              style={{ width: '100%', padding: '6px', justifyContent: 'center', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              onClick={() => {
                localStorage.removeItem('perfora_logged_in');
                setIsLoggedIn(false);
                setToasts(prev => [
                  {
                    id: `toast-${Date.now()}`,
                    title: 'Logged Out',
                    desc: 'Successfully logged out of admin session.'
                  },
                  ...prev
                ]);
              }}
            >
              <LogOut size={12} /> Log Out Session
            </button>
          )}
        </div>
      </aside>

      {/* ==========================================
          MAIN CONTENT WORKSPACE
          ========================================== */}
      <main className="main-content">
        
        {/* ==========================================
            HEADER & GLOBAL UTILITIES
            ========================================== */}
        <header className="header">
          <div className="header-left">
            <div className="global-search-wrapper">
              <Search className="global-search-icon" size={16} />
              <input
                type="text"
                placeholder="Global Search (Press '/' to search across products, orders, customers)..."
                className="global-search-input"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
              />
            </div>
            
            {/* Quick Preview Store Link */}
          </div>

          <div className="header-right">
            {/* Live Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
              <span className="pulse-indicator"></span>
              <span>{liveVisitors} Live Shoppers</span>
            </div>

            {/* Quick Preview Store Link */}
            <button 
              className="btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => setStorePreviewOpen(true)}
            >
              <Globe size={14} /> Preview Store
            </button>

            {/* Dark Mode Toggle */}
            <button className="icon-btn" onClick={() => {
              const nextTheme = theme === 'light' ? 'dark' : 'light';
              setTheme(nextTheme);
              logAudit('Theme Toggled', `Switched layout system theme to ${nextTheme}`);
            }}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Notifications Alert Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                className="icon-btn" 
                onClick={() => setNotiDropdownOpen(!notiDropdownOpen)}
                style={{ position: 'relative' }}
              >
                {muteOrderToasts ? <BellOff size={18} style={{ color: 'var(--accent-coral)' }} /> : <Bell size={18} />}
                <span className="badge-dot" style={{ backgroundColor: muteOrderToasts ? 'var(--accent-coral)' : '#10B981' }}></span>
              </button>

              {notiDropdownOpen && (
                <div style={{ 
                  position: 'absolute', 
                  top: '100%', 
                  right: 0, 
                  marginTop: '10px', 
                  width: '320px', 
                  background: 'var(--bg-pure)', 
                  border: '1px solid var(--border-light)', 
                  borderRadius: 'var(--radius-md)', 
                  boxShadow: 'var(--shadow-lg)', 
                  zIndex: 1000,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                      {muteOrderToasts ? <BellOff size={14} color="var(--accent-coral)" /> : <Bell size={14} color="var(--primary-teal)" />}
                      Notification Center
                    </span>
                    <span style={{ fontSize: '10px', background: 'var(--bg-cream)', padding: '2px 6px', borderRadius: '4px', color: 'var(--primary-teal)', fontWeight: 600 }}>
                      Live Feed
                    </span>
                  </div>

                  {/* Toggle Card Option */}
                  <div style={{ 
                    background: 'var(--bg-cream)', 
                    border: '1px solid var(--border-light)', 
                    borderRadius: 'var(--radius-sm)', 
                    padding: '10px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <input 
                        type="checkbox" 
                        checked={muteOrderToasts}
                        onChange={(e) => {
                          setMuteOrderToasts(e.target.checked);
                          addToast(
                            e.target.checked ? '🔕 Order Alerts Muted' : '🔔 Order Alerts Active',
                            e.target.checked ? 'Real-time order popup notifications have been hidden.' : 'Real-time order popup notifications are now active.'
                          );
                        }}
                        style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: 'var(--primary-teal)' }}
                      />
                      <span>Hide Order Popups</span>
                    </label>
                    <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0, paddingLeft: '23px' }}>
                      Mutes screen-flashing alert notifications. Orders will still populate background feeds silently.
                    </p>
                  </div>

                  {/* Recent Activity List inside Dropdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>RECENT ORDERS FEED:</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '160px', overflowY: 'auto' }}>
                      {orders.slice(0, 3).map((o) => (
                        <div key={o.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: 'var(--bg-cream)', padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--border-light)', fontSize: '11px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                            <span style={{ color: 'var(--primary-teal)' }}>{o.id}</span>
                            <span style={{ color: 'var(--text-muted)' }}>{new Date(o.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
                          </div>
                          <div style={{ color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {o.customer} bought {o.items.split(' x')[0]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Global Filter Bar */}
        <div style={{ padding: '16px 32px 0 32px' }}>
          <div className="filter-bar">
            <div className="filter-group">
              <Clock size={16} color="var(--text-muted)" />
              <span style={{ fontSize: '13px', fontWeight: 500 }}>Global Operations Date: <strong>Today (Real-time Sync)</strong></span>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-secondary" style={{ padding: '8px 14px', fontSize: '12px' }} onClick={() => {
                logAudit('Manual Backup', 'Triggered standard backup of DB & static files');
                addToast('💽 System Backup Complete', 'Clean dump generated successfully in safe storage.');
              }}>
                <Database size={14} /> Backup Database
              </button>
              
              <button className="btn-primary" style={{ padding: '8px 14px', fontSize: '12px' }} onClick={handleOpenAddProduct}>
                <Plus size={14} /> Quick Add Product
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================
            PAGES WORKFLOW MANAGER
            ========================================== */}
        <div className="page-body">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title"><LayoutDashboard size={28} color={brandColor} /> Operations Dashboard</h1>
                  <p className="page-subtitle">Granular real-time intelligence for Perfora Care D2C workflow.</p>
                </div>
              </div>

              {/* Advanced Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-header">
                    <span>CUMULATIVE D2C REVENUE</span>
                    <div className="stat-icon-box"><DollarSign size={18} /></div>
                  </div>
                  <div className="stat-value">₹{totalSalesCount.toLocaleString('en-IN')}</div>
                  <div className="stat-trend trend-up">
                    <TrendingUp size={14} /> +32.8% YoY brand scale
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span>TOTAL D2C ORDERS PLACED</span>
                    <div className="stat-icon-box"><ShoppingCart size={18} /></div>
                  </div>
                  <div className="stat-value">{totalOrderCount.toLocaleString('en-IN')}</div>
                  <div className="stat-trend trend-up">
                    <Sparkles size={14} /> 10 Lakhs+ milestone cleared!
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span>LOW STOCK ALERT (&lt;100 units)</span>
                    <div className="stat-icon-box"><Boxes size={18} /></div>
                  </div>
                  <div className="stat-value">{lowStockCount}</div>
                  <div className="stat-trend text-muted" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                    Critical: {products.filter(p => p.inventory < 100).map(p => p.sku).join(', ') || 'None'}
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span>MONTHLY SEO TRAFFIC</span>
                    <div className="stat-icon-box"><Globe size={18} /></div>
                  </div>
                  <div className="stat-value">{seoTraffic.toLocaleString('en-IN')}+</div>
                  <div className="stat-trend trend-up">
                    <TrendingUp size={14} /> +450K monthly organic sessions
                  </div>
                </div>
              </div>

              {/* Main Content splits */}
              <div className="dashboard-grid">
                
                {/* Real-time Live Orders Card */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <span className="pulse-indicator"></span> Real-time D2C Orders Feed (Live)
                    </h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Simulated active webhook triggers</span>
                  </div>
                  <div className="card-body">
                    <div className="table-wrapper">
                      <table className="premium-table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Product(s)</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Gateway</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 5).map(order => (
                            <tr key={order.id}>
                              <td style={{ fontWeight: 700, color: 'var(--primary-teal)' }}>{order.id}</td>
                              <td>
                                <div><strong>{order.customer}</strong></div>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{order.phone}</span>
                              </td>
                              <td style={{ maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {order.items}
                              </td>
                              <td style={{ fontWeight: 600 }}>₹{order.total}</td>
                              <td>
                                <span className={`badge badge-${order.status}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td>
                                <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-paid' : 'badge-unpaid'}`}>
                                  {order.paymentMethod} • {order.paymentStatus}
                                </span>
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                  <button className="btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => setSelectedOrder(order)}>
                                    View
                                  </button>
                                  {order.status === 'pending' && (
                                    <button className="btn-primary" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => handleFulfillOrder(order.id)}>
                                      Fulfill
                                    </button>
                                  )}
                                  {order.paymentMethod === 'COD' && !order.items.includes('VERIFIED') && (
                                    <button className="btn-secondary" style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--accent-coral)', borderColor: 'var(--accent-coral)' }} onClick={() => triggerOtpCheck(order)}>
                                      Verify OTP
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Widgets Side Bar: Tasks, System CPU, Online Staff */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Task checklist */}
                  <div className="card" style={{ margin: 0 }}>
                    <div className="card-header">
                      <h3 className="card-title">Staff Tasks Queue</h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Assign a system task..."
                          value={newTodoText}
                          onChange={(e) => setNewTodoText(e.target.value)}
                        />
                        <select 
                          className="form-select" 
                          style={{ width: '110px' }}
                          value={todoAssignee}
                          onChange={(e) => setTodoAssignee(e.target.value)}
                        >
                          <option>Ops Lead</option>
                          <option>SEO Admin</option>
                          <option>Support</option>
                        </select>
                        <button className="btn-primary" type="submit" style={{ padding: '10px' }}><Plus size={16} /></button>
                      </form>

                      <div>
                        {toDos.map(todo => (
                          <div className="todo-item" key={todo.id}>
                            <div className="todo-left">
                              <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleTodo(todo.id)}
                                style={{ width: '16px', height: '16px', accentColor: brandColor, cursor: 'pointer' }}
                              />
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span className={`todo-text ${todo.completed ? 'completed' : ''}`} style={{ fontSize: '13px' }}>
                                  {todo.text}
                                </span>
                                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Assigned: {todo.assigned}</span>
                              </div>
                            </div>
                            <button className="icon-btn" onClick={() => handleDeleteTodo(todo.id)} style={{ color: '#EF4444' }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Server Resource Monitor */}
                  <div className="card" style={{ margin: 0 }}>
                    <div className="card-header">
                      <h3 className="card-title"><Database size={16} /> Cloud Resource Monitor</h3>
                    </div>
                    <div className="card-body">
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                          <span>Server CPU Usage</span>
                          <span>{serverCPU}%</span>
                        </div>
                        <div className="progress-bar-container">
                          <div className="progress-bar-fill" style={{ width: `${serverCPU}%`, backgroundColor: serverCPU > 75 ? '#EF4444' : 'var(--primary-teal)' }}></div>
                        </div>
                      </div>

                      <div style={{ marginTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                          <span>Memory Usage (Redis Cache)</span>
                          <span>{serverRAM}%</span>
                        </div>
                        <div className="progress-bar-container">
                          <div className="progress-bar-fill" style={{ width: `${serverRAM}%`, backgroundColor: 'var(--accent-coral)' }}></div>
                        </div>
                      </div>

                      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <span>Host: AWS ap-south-1a</span>
                        <span>API Speed: 14ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Audit logs brief */}
                  <div className="card" style={{ margin: 0 }}>
                    <div className="card-header">
                      <h3 className="card-title">Recent Activity Logs</h3>
                    </div>
                    <div className="card-body" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                      {auditLogs.map((log, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700 }}>
                            <span style={{ color: 'var(--primary-teal)' }}>{log.action}</span>
                            <span style={{ color: 'var(--text-muted)' }}>{log.timestamp}</span>
                          </div>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{log.details}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS CATALOG */}
          {activeTab === 'products' && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title"><Package size={28} color={brandColor} /> Product Catalog & Pricing</h1>
                  <p className="page-subtitle">Configure SKU data, automated pricing rules, variants and calculated profit margin metrics.</p>
                </div>
                <button className="btn-primary" onClick={handleOpenAddProduct}><Plus size={16} /> Add Product</button>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="table-wrapper">
                    <table className="premium-table">
                      <thead>
                        <tr>
                          <th>Thumbnail & Title</th>
                          <th>Category</th>
                          <th>SKU / Code</th>
                          <th>Base / Sale Price</th>
                          <th>Cost per Item</th>
                          <th>Profit Margin</th>
                          <th>Stock Level</th>
                          <th>Status</th>
                          <th>Featured</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map(product => {
                          const profitVal = product.salePrice - product.cost;
                          const profitPercent = ((profitVal / product.salePrice) * 100).toFixed(1);
                          return (
                            <tr key={product.id}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: 'var(--border-light)', display: 'flex', alignItems: 'center', justifyPoints: 'center', color: 'var(--primary-teal)', fontWeight: 800, fontSize: '11px', justifyContent: 'center' }}>
                                    PF
                                  </div>
                                  <div>
                                    <strong>{product.title}</strong>
                                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', gap: '4px' }}>
                                      {product.tags.map(t => <span key={t} style={{ background: 'var(--bg-cream)', padding: '1px 4px', borderRadius: '3px' }}>{t}</span>)}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>{product.category}</td>
                              <td style={{ fontFamily: 'monospace' }}>{product.sku}</td>
                              <td>
                                <div><span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '11px' }}>₹{product.price}</span></div>
                                <strong style={{ color: 'var(--primary-teal)', fontSize: '14px' }}>₹{product.salePrice}</strong>
                              </td>
                              <td style={{ color: 'var(--text-muted)' }}>₹{product.cost}</td>
                              <td>
                                <div style={{ fontWeight: 600, color: '#10B981' }}>
                                  ₹{profitVal} ({profitPercent}%)
                                </div>
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <strong style={{ color: product.inventory < 100 ? '#EF4444' : 'var(--text-primary)' }}>{product.inventory}</strong>
                                  {product.inventory < 100 && <span style={{ fontSize: '10px', background: '#FEE2E2', color: '#DC2626', padding: '2px 6px', borderRadius: '10px', fontWeight: 600 }}>Low</span>}
                                </div>
                              </td>
                              <td>
                                <span style={{ background: '#D1FAE5', color: '#059669', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600 }}>Active</span>
                              </td>
                              <td>
                                <button className="icon-btn" style={{ color: product.featured ? '#E2876E' : 'var(--text-muted)' }} onClick={() => {
                                  setProducts(prev => prev.map(p => p.id === product.id ? { ...p, featured: !p.featured } : p));
                                  addToast('Featured Toggled', `Changed featured status for SKU ${product.sku}`);
                                }}>
                                  <Star size={16} fill={product.featured ? '#E2876E' : 'none'} />
                                </button>
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                  <button className="btn-secondary" style={{ padding: '6px' }} onClick={() => {
                                    setEditingProduct(product);
                                    setProductModalOpen(true);
                                  }}><Sliders size={14} /></button>
                                  
                                  <button className="btn-secondary" style={{ padding: '6px' }} onClick={() => handleCloneProduct(product)}><Copy size={14} /></button>
                                  
                                  <button className="btn-danger" style={{ padding: '6px' }} onClick={() => handleDeleteProduct(product.id, product.sku)}><Trash2 size={14} /></button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WAREHOUSE & INVENTORY */}
          {activeTab === 'inventory' && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title"><Boxes size={28} color={brandColor} /> Warehouse Inventory Manager</h1>
                  <p className="page-subtitle">Real-time stock adjustment, inter-warehouse transfers (FIFO) and packaging logistics setup.</p>
                </div>
              </div>

              <div className="dashboard-grid">
                
                {/* Stocks levels */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Location Stock Ledger</h3>
                  </div>
                  <div className="card-body">
                    <div className="table-wrapper">
                      <table className="premium-table">
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Delhi WH</th>
                            <th>Mumbai WH</th>
                            <th>Bangalore WH</th>
                            <th>Global Stock</th>
                            <th>RTV Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(p => {
                            const dStock = Math.floor(p.inventory * 0.35);
                            const mStock = Math.floor(p.inventory * 0.40);
                            const bStock = p.inventory - (dStock + mStock);
                            return (
                              <tr key={p.id}>
                                <td><strong>{p.title}</strong><br/><span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{p.sku}</span></td>
                                <td>{dStock} <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>(Shelf A-4)</span></td>
                                <td>{mStock} <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>(Shelf B-1)</span></td>
                                <td>{bStock} <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>(Shelf C-2)</span></td>
                                <td style={{ fontWeight: 700, color: 'var(--primary-teal)' }}>{p.inventory}</td>
                                <td>
                                  <button className="btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => {
                                    addToast('RTV Shipment Processed', `Dispatched quarantine return to vendor for SKU ${p.sku}`);
                                    logAudit('RTV Shipped', `Dispatched returns vendor for SKU ${p.sku}`);
                                  }}>
                                    Return to Vendor
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Actions Panel: Stock adjust & Audit */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Stock Adjustment console */}
                  <div className="card" style={{ margin: 0 }}>
                    <div className="card-header">
                      <h3 className="card-title">Manual Stock Adjustment</h3>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label className="form-label">Select SKU</label>
                        <select className="form-select" id="adjust-sku">
                          {products.map(p => <option key={p.id} value={p.id}>{p.sku} - {p.title}</option>)}
                        </select>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Delta (+/-)</label>
                          <input type="number" className="form-input" defaultValue="10" id="adjust-qty" />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Adjustment Reason</label>
                          <select className="form-select" id="adjust-reason">
                            <option>Audit Discrepancy</option>
                            <option>Damaged in Storage</option>
                            <option>Theft/Loss</option>
                            <option>Promo Gifting</option>
                          </select>
                        </div>
                      </div>

                      <button className="btn-primary" style={{ width: '100%' }} onClick={() => {
                        const selId = document.getElementById('adjust-sku').value;
                        const delta = parseInt(document.getElementById('adjust-qty').value);
                        const reason = document.getElementById('adjust-reason').value;
                        
                        setProducts(prev => prev.map(p => {
                          if (p.id === selId) {
                            const newInv = Math.max(0, p.inventory + delta);
                            return { ...p, inventory: newInv };
                          }
                          return p;
                        }));

                        addToast('Stock Adjusted', `Inventory quantity adjusted by ${delta} due to ${reason}.`);
                        logAudit('Inventory Adjusted', `SKU adjusted by ${delta} (${reason})`);
                      }}>
                        Save Adjustment
                      </button>
                    </div>
                  </div>

                  {/* Supplier database PO order maker */}
                  <div className="card" style={{ margin: 0 }}>
                    <div className="card-header">
                      <h3 className="card-title">Initiate Supplier Purchase Order</h3>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label className="form-label">Select Supplier Partner</label>
                        <select className="form-select">
                          <option>DuPont Filament & Brush Co. Ltd.</option>
                          <option>Charcoal Extraction India Pvt Ltd.</option>
                          <option>Pro-Mouthwash Packing Logistics</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Quantity to Order</label>
                        <input type="number" className="form-input" defaultValue="500" />
                      </div>

                      <button className="btn-secondary" style={{ width: '100%' }} onClick={() => {
                        addToast('PO Sent', 'Supplier notified via email. Purchase Order marked as Pending.');
                        logAudit('Supplier PO Generated', 'Sent PO order requests to supplier');
                      }}>
                        Dispatch Supplier PO Email
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 4: ORDERS & AWB */}
          {activeTab === 'orders' && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title"><ShoppingCart size={28} color={brandColor} /> D2C Order Operations</h1>
                  <p className="page-subtitle">Generate dynamic AWBs, track Courier API logs, audit COD risk levels and process refunds.</p>
                </div>
                <button className="btn-primary" onClick={() => {
                  setNewOrderForm(prev => ({ ...prev, productId: products[0]?.id || '' }));
                  setCreateOrderModalOpen(true);
                }}>
                  <Plus size={16} /> Create Backend Order
                </button>
              </div>

              {/* Advanced filter orders section */}
              <div className="card">
                <div className="card-body">
                  <div className="table-wrapper">
                    <table className="premium-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Order Date</th>
                          <th>Customer Details</th>
                          <th>Delivery Location</th>
                          <th>Items Purchased</th>
                          <th>Invoice Value</th>
                          <th>Gateway / Status</th>
                          <th>AWB Tracker</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map(order => (
                          <tr key={order.id}>
                            <td style={{ fontWeight: 700, color: 'var(--primary-teal)' }}>{order.id}</td>
                            <td>{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            <td>
                              <strong>{order.customer}</strong><br/>
                              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{order.email}</span>
                            </td>
                            <td>{order.warehouse} Warehouse <br/><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{order.address.split(',')[order.address.split(',').length - 2]}</span></td>
                            <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.items}</td>
                            <td style={{ fontWeight: 700 }}>₹{order.total}</td>
                            <td>
                              <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-paid' : 'badge-unpaid'}`} style={{ marginRight: '6px' }}>
                                {order.paymentMethod}
                              </span>
                              <span className={`badge badge-${order.status}`}>
                                {order.status}
                              </span>
                            </td>
                            <td>
                              {order.awb ? (
                                <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-muted)' }}>
                                  {order.awb} <br/>
                                  <span style={{ fontSize: '9px', background: '#DBEAFE', color: '#2563EB', padding: '1px 4px', borderRadius: '4px' }}>Delhivery Active</span>
                                </span>
                              ) : (
                                <button className="btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => handleFulfillOrder(order.id)}>
                                  <Truck size={12} /> Auto AWB
                                </button>
                              )}
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button className="btn-secondary" style={{ padding: '6px' }} onClick={() => setSelectedOrder(order)}><FileText size={14} /></button>
                                
                                {order.paymentStatus !== 'refunded' && (
                                  <button className="btn-danger" style={{ padding: '6px' }} onClick={() => handleProcessRefund(order.id)} title="Refund"><RotateCcw size={14} /></button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SUBSCRIPTIONS */}
          {activeTab === 'subscriptions' && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title"><RefreshCw size={28} color={brandColor} /> Subscription Hub & MRR</h1>
                  <p className="page-subtitle">Configure auto-billing frequencies, recurring D2C replenishment plans and track subscriber churn rates.</p>
                </div>
              </div>

              <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                <div className="stat-card">
                  <div className="stat-header"><span>MONTHLY RECURRING REVENUE (MRR)</span></div>
                  <div className="stat-value">₹45,820</div>
                  <div className="stat-trend trend-up">Target: ₹50K monthly threshold</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span>ESTIMATED RETENTION RATE</span></div>
                  <div className="stat-value">91.4%</div>
                  <div className="stat-trend trend-up">High loyalty score index</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span>AVG CHURN RATE</span></div>
                  <div className="stat-value">2.1%</div>
                  <div className="stat-trend trend-down">Down from 3.5% last quarter</div>
                </div>
              </div>

              <div className="card">
                <div className="card-header"><h3 className="card-title">Recurring Subscriber Log</h3></div>
                <div className="card-body">
                  <div className="table-wrapper">
                    <table className="premium-table">
                      <thead>
                        <tr>
                          <th>Subscriber ID</th>
                          <th>Customer</th>
                          <th>Assigned Replenishment Item</th>
                          <th>Frequency</th>
                          <th>MRR Value</th>
                          <th>Next Billing Run</th>
                          <th>Dunning Attempts</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscriptions.map(sub => (
                          <tr key={sub.id}>
                            <td style={{ fontWeight: 700, color: 'var(--primary-teal)' }}>{sub.id}</td>
                            <td><strong>{sub.customer}</strong></td>
                            <td>{sub.product}</td>
                            <td>{sub.frequency}</td>
                            <td style={{ fontWeight: 600 }}>₹{sub.mrr}</td>
                            <td>{sub.nextBilling}</td>
                            <td>0 Attempts <span style={{ fontSize: '10px', background: '#D1FAE5', color: '#059669', padding: '2px 6px', borderRadius: '10px', marginLeft: '6px' }}>Clear</span></td>
                            <td>
                              <span className={`badge ${sub.status === 'active' ? 'badge-delivered' : 'badge-pending'}`}>
                                {sub.status}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => {
                                  const nextStatus = sub.status === 'active' ? 'paused' : 'active';
                                  setSubscriptions(prev => prev.map(s => s.id === sub.id ? { ...s, status: nextStatus } : s));
                                  addToast('Subscription Updated', `Subscriber ID ${sub.id} is now ${nextStatus}`);
                                  logAudit('Subscription Modified', `Set status to ${nextStatus} for subscriber ${sub.id}`);
                                }}>
                                  {sub.status === 'active' ? 'Pause' : 'Resume'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CRM & CUSTOMERS */}
          {activeTab === 'customers' && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title"><Users size={28} color={brandColor} /> Customer CRM & Store Credit</h1>
                  <p className="page-subtitle">Track individual Lifetime Value (LTV), credit balance adjustments, customer tagging, and feedback reviews.</p>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="table-wrapper">
                    <table className="premium-table">
                      <thead>
                        <tr>
                          <th>Customer Info</th>
                          <th>Contact Details</th>
                          <th>Total Orders Placed</th>
                          <th>Lifetime Value (LTV)</th>
                          <th>Store Credit Balance</th>
                          <th>Account Status</th>
                          <th>Segment Tags</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomers.map(cust => (
                          <tr key={cust.id}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div className="profile-avatar">{cust.name.substring(0, 2).toUpperCase()}</div>
                                <strong>{cust.name}</strong>
                              </div>
                            </td>
                            <td>
                              {cust.email} <br/>
                              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{cust.phone}</span>
                            </td>
                            <td style={{ fontWeight: 600 }}>{cust.ordersCount} orders</td>
                            <td style={{ fontWeight: 700, color: 'var(--primary-teal)' }}>₹{cust.ltv}</td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <strong>₹{cust.credit}</strong>
                                <button className="btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => {
                                  setSelectedCustomer(cust);
                                }}>+/- Credit</button>
                              </div>
                            </td>
                            <td><span style={{ background: '#D1FAE5', color: '#059669', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600 }}>Verified</span></td>
                            <td>
                              {cust.tags.map(tag => (
                                <span key={tag} className="badge" style={{ background: tag === 'VIP' ? 'var(--accent-coral-light)' : 'var(--border-light)', color: tag === 'VIP' ? 'var(--accent-coral)' : 'var(--text-primary)', marginRight: '4px' }}>
                                  {tag}
                                </span>
                              ))}
                            </td>
                            <td>
                              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => {
                                addToast('NPS Survey Pushed', `Manual email sent to ${cust.name} for Net Promoter feedback.`);
                                logAudit('CRM Activity Triggered', `Sent manual feedback email to ${cust.email}`);
                              }}>
                                Request NPS Survey
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CAMPAIGNS & MARKETING */}
          {activeTab === 'marketing' && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title"><Megaphone size={28} color={brandColor} /> D2C Marketing Campaigns & Coupons</h1>
                  <p className="page-subtitle">Draft discount codes, configure Google Shopping catalog XML feeds and build UTM tracker URLs.</p>
                </div>
              </div>

              <div className="dashboard-grid">
                
                {/* Coupons database */}
                <div className="card">
                  <div className="card-header"><h3 className="card-title">Promo Coupon Codes</h3></div>
                  <div className="card-body">
                    <div className="table-wrapper">
                      <table className="premium-table">
                        <thead>
                          <tr>
                            <th>Coupon Code</th>
                            <th>Discount Model</th>
                            <th>Min Purchase</th>
                            <th>Total Usages</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {discounts.map(disc => (
                            <tr key={disc.code}>
                              <td style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '14px', color: 'var(--primary-teal)' }}>{disc.code}</td>
                              <td>{disc.type} {disc.value > 0 ? `(${disc.value}%)` : ''}</td>
                              <td>₹{disc.minSpend}</td>
                              <td>{disc.usages} used</td>
                              <td><span style={{ background: '#D1FAE5', color: '#059669', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600 }}>Active</span></td>
                              <td>
                                <button className="btn-danger" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => {
                                  setDiscounts(prev => prev.filter(d => d.code !== disc.code));
                                  addToast('Coupon Disabled', `Promo code ${disc.code} deactivated.`);
                                  logAudit('Campaign Changed', `Disabled promo coupon code ${disc.code}`);
                                }}>
                                  Revoke
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Add coupon tool & UTM builder */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Coupon generator */}
                  <div className="card" style={{ margin: 0 }}>
                    <div className="card-header"><h3 className="card-title">Create Promo Code</h3></div>
                    <div className="card-body">
                      <div className="form-group">
                        <label className="form-label">Coupon Code (All Caps)</label>
                        <input type="text" className="form-input" placeholder="SMILE40" id="new-code" />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Type</label>
                          <select className="form-select" id="new-type">
                            <option>Percentage</option>
                            <option>Flat Amount</option>
                            <option>Free Shipping</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Value</label>
                          <input type="number" className="form-input" placeholder="15" id="new-val" />
                        </div>
                      </div>
                      <button className="btn-primary" style={{ width: '100%' }} onClick={() => {
                        const code = document.getElementById('new-code').value.toUpperCase().trim();
                        const type = document.getElementById('new-type').value;
                        const val = parseInt(document.getElementById('new-val').value) || 0;

                        if (!code) return;

                        const newDisc = {
                          code,
                          type,
                          value: val,
                          minSpend: 499,
                          usageLimit: 1000,
                          usages: 0,
                          status: 'active'
                        };

                        setDiscounts(prev => [...prev, newDisc]);
                        addToast('🏷️ Coupon Created', `Deals code ${code} is now live at checkout ports.`);
                        logAudit('Coupon Created', `Created checkout discount ${code}`);
                        
                        document.getElementById('new-code').value = '';
                        document.getElementById('new-val').value = '';
                      }}>
                        Publish Coupon
                      </button>
                    </div>
                  </div>

                  {/* UTM link creator */}
                  <div className="card" style={{ margin: 0 }}>
                    <div className="card-header"><h3 className="card-title">UTM Tracker URL Builder</h3></div>
                    <div className="card-body">
                      <div className="form-group">
                        <label className="form-label">Website Target URL</label>
                        <input type="text" className="form-input" defaultValue="https://perforacare.in" id="utm-target" />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">UTM Source</label>
                          <input type="text" className="form-input" defaultValue="instagram" id="utm-source" />
                        </div>
                        <div className="form-group">
                          <label className="form-label">UTM Medium</label>
                          <input type="text" className="form-input" defaultValue="influencer" id="utm-medium" />
                        </div>
                      </div>
                      <button className="btn-secondary" style={{ width: '100%' }} onClick={() => {
                        const target = document.getElementById('utm-target').value;
                        const source = document.getElementById('utm-source').value;
                        const medium = document.getElementById('utm-medium').value;
                        const finalUrl = `${target}?utm_source=${source}&utm_medium=${medium}&utm_campaign=summer_sale_2026`;
                        
                        navigator.clipboard.writeText(finalUrl);
                        addToast('📋 Link Copied', 'UTM Campaign URL copied to clipboard.');
                        logAudit('UTM Link Built', `Generated campaign URL: ${finalUrl}`);
                      }}>
                        Copy UTM Link
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 8: CMS STOREFRONT */}
          {activeTab === 'cms' && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title"><Monitor size={28} color={brandColor} /> CMS Storefront Brand Controls</h1>
                  <p className="page-subtitle">Configure legal policies, navigation menus, sliding promotional banners, and live brand theme colors.</p>
                </div>
              </div>

              <div className="dashboard-grid">
                
                {/* Brand variables live console */}
                <div className="card">
                  <div className="card-header"><h3 className="card-title">Real-time Brand Customization Console</h3></div>
                  <div className="card-body">
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
                      
                      <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                        <label className="form-label">Primary Deep Teal Hex</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <input 
                            type="color" 
                            value={brandColor} 
                            onChange={(e) => setBrandColor(e.target.value)} 
                            style={{ width: '42px', height: '42px', border: 'none', cursor: 'pointer', borderRadius: '50%', background: 'transparent' }}
                          />
                          <input 
                            type="text" 
                            className="form-input" 
                            value={brandColor} 
                            onChange={(e) => setBrandColor(e.target.value)} 
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                        <label className="form-label">Mint Accent Hex</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <input 
                            type="color" 
                            value={mintAccent} 
                            onChange={(e) => setMintAccent(e.target.value)} 
                            style={{ width: '42px', height: '42px', border: 'none', cursor: 'pointer', borderRadius: '50%', background: 'transparent' }}
                          />
                          <input 
                            type="text" 
                            className="form-input" 
                            value={mintAccent} 
                            onChange={(e) => setMintAccent(e.target.value)} 
                          />
                        </div>
                      </div>

                    </div>

                    <div style={{ padding: '16px', background: 'var(--bg-cream)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-teal)', fontWeight: 700, marginBottom: '8px' }}>Storefront Preview Simulation</h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                        This panel injects brand variables to the stylesheet live. Check the sidebar logo and primary buttons - they dynamically adapt to your selected colors in real time!
                      </p>
                      
                      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                        <button className="btn-primary" style={{ fontSize: '12px', padding: '6px 12px' }}>Interactive Primary Action</button>
                        <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>Secondary Link</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ and Blog entries compiler */}
                <div className="card">
                  <div className="card-header"><h3 className="card-title">Interactive Store FAQ Builder</h3></div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">FAQ Category</label>
                      <select className="form-select">
                        <option>Product Questions</option>
                        <option>Shipping & Returns</option>
                        <option>Subscription Plan</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Question</label>
                      <input type="text" className="form-input" placeholder="Is the Electric Toothbrush water-resistant?" />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Answer (Rich HTML support)</label>
                      <textarea className="form-textarea" rows="3" placeholder="Yes, the electric toothbrush has IPX7 water resistance and can be safely washed."></textarea>
                    </div>

                    <button className="btn-primary" style={{ width: '100%' }} onClick={() => {
                      addToast('FAQ Entry Added', 'Draft FAQ entry saved to storefront DB schema.');
                      logAudit('CMS Update', 'Added product page FAQ entry');
                    }}>
                      Inject FAQ Element
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 9: ADVANCED REPORTS */}
          {activeTab === 'analytics' && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title"><BarChart3 size={28} color={brandColor} /> Advanced Analytics & GST</h1>
                  <p className="page-subtitle">Detailed transactional analytics, conversion funnel drop-offs and calculated GST accounting sheets.</p>
                </div>
              </div>

              <div className="dashboard-grid">
                
                {/* SVGs Sales analytics */}
                <div className="card">
                  <div className="card-header"><h3 className="card-title">Daily Operations Sales Volume Tracker (₹)</h3></div>
                  <div className="card-body">
                    
                    {/* SVG Graphic represent sales line */}
                    <div style={{ height: '220px', width: '100%', position: 'relative', marginTop: '20px' }}>
                      <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%' }}>
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={brandColor} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={brandColor} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <line x1="0" y1="50" x2="500" y2="50" stroke="var(--border-light)" strokeDasharray="5,5" />
                        <line x1="0" y1="100" x2="500" y2="100" stroke="var(--border-light)" strokeDasharray="5,5" />
                        <line x1="0" y1="150" x2="500" y2="150" stroke="var(--border-light)" strokeDasharray="5,5" />

                        {/* Spline chart path */}
                        <path 
                          d="M 10 160 Q 90 120 170 140 T 330 80 T 490 50" 
                          fill="none" 
                          stroke={brandColor} 
                          strokeWidth="4" 
                        />
                        <path 
                          d="M 10 160 Q 90 120 170 140 T 330 80 T 490 50 L 490 200 L 10 200 Z" 
                          fill="url(#chartGrad)" 
                        />

                        {/* Data point indicators */}
                        <circle cx="10" cy="160" r="6" fill="#E2876E" />
                        <circle cx="170" cy="140" r="6" fill="#E2876E" />
                        <circle cx="330" cy="80" r="6" fill="#E2876E" />
                        <circle cx="490" cy="50" r="6" fill="#E2876E" />
                      </svg>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
                      <span>Mon (₹12,490)</span>
                      <span>Wed (₹18,290)</span>
                      <span>Fri (₹26,900)</span>
                      <span>Today (₹{totalSales.toLocaleString('en-IN')})</span>
                    </div>

                  </div>
                </div>

                {/* Conversion Funnel dropoffs */}
                <div className="card">
                  <div className="card-header"><h3 className="card-title">D2C Checkout Funnel Drop-off Rate</h3></div>
                  <div className="card-body">
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700 }}>
                          <span>1. Store Visits (Sessions)</span>
                          <span>100% (4,520 Sessions)</span>
                        </div>
                        <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '100%' }}></div></div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700 }}>
                          <span>2. Added to Cart (ATC)</span>
                          <span>34.2% (1,545 Users)</span>
                        </div>
                        <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '34.2%', backgroundColor: 'var(--accent-coral)' }}></div></div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700 }}>
                          <span>3. Initiated Checkout</span>
                          <span>12.5% (565 Users)</span>
                        </div>
                        <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '12.5%', backgroundColor: 'var(--accent-coral)' }}></div></div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700 }}>
                          <span>4. Purchase Completed</span>
                          <span>3.8% (172 Buyers)</span>
                        </div>
                        <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '3.8%', backgroundColor: '#10B981' }}></div></div>
                      </div>
                    </div>

                    <div style={{ marginTop: '20px', padding: '12px', background: 'var(--bg-cream)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '12px' }}>
                      <strong style={{ color: 'var(--primary-teal)' }}>Optimization Insights:</strong> ATC-to-Checkout conversion is above benchmark, but cart drops could be improved with dynamic WhatsApp discount alerts.
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 10: HELPDESK & SUPPORT */}
          {activeTab === 'support' && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title"><HelpCircle size={28} color={brandColor} /> Helpdesk Tickets & Live Chat</h1>
                  <p className="page-subtitle">Resolve shopper tickets, apply canned macros, and overtake live AI chatbot interactions.</p>
                </div>
              </div>

              <div className="dashboard-grid">
                
                {/* Tickets list */}
                <div className="card">
                  <div className="card-header"><h3 className="card-title">Interactive Support Ticket Queue</h3></div>
                  <div className="card-body">
                    <div className="table-wrapper">
                      <table className="premium-table">
                        <thead>
                          <tr>
                            <th>Ticket ID</th>
                            <th>Customer Name</th>
                            <th>Subject Issue</th>
                            <th>Priority</th>
                            <th>Date Recieved</th>
                            <th>Resolution</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {supportTickets.map(t => (
                            <tr key={t.id}>
                              <td style={{ fontWeight: 700, color: 'var(--primary-teal)' }}>{t.id}</td>
                              <td><strong>{t.customer}</strong></td>
                              <td>{t.subject}</td>
                              <td>
                                <span className="badge" style={{ background: t.priority === 'high' ? '#FEE2E2' : '#FEF3C7', color: t.priority === 'high' ? '#DC2626' : '#D97706' }}>
                                  {t.priority}
                                </span>
                              </td>
                              <td>{new Date(t.date).toLocaleDateString()}</td>
                              <td>
                                <span className={`badge ${t.status === 'open' ? 'badge-pending' : 'badge-delivered'}`}>
                                  {t.status}
                                </span>
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                  <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => {
                                    addToast('Bot Overtaken', 'Chat session locked. Admin keyboard is now broadcasting.');
                                    logAudit('Chat Overridden', `Admin overtook chatbot session for user ${t.customer}`);
                                  }}>
                                    Overtake Live Chat
                                  </button>
                                  <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => {
                                    setSupportTickets(prev => prev.map(tick => tick.id === t.id ? { ...tick, status: 'resolved' } : tick));
                                    addToast('Ticket Closed', `Issue ID ${t.id} marked as resolved.`);
                                    logAudit('Support Action', `Closed support ticket ID ${t.id}`);
                                  }}>
                                    Resolve
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Chat Bot transcripts panel */}
                <div className="card">
                  <div className="card-header"><h3 className="card-title">Live Chat Takeover</h3></div>
                  <div className="card-body">
                    <div style={{ height: '220px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '16px', overflowY: 'auto', background: 'var(--bg-cream)', marginBottom: '16px' }}>
                      <div style={{ fontSize: '11px', textAlign: 'center', color: 'var(--text-muted)', marginBottom: '10px' }}>Bot started conversation at 16:00</div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ background: '#fff', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-light)', maxWidth: '80%', alignSelf: 'flex-start' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary-teal)' }}>Kabir Kapoor</span>
                          <p style={{ fontSize: '12px', marginTop: '2px' }}>Hey, I just bought the pro flosser. The water jet pressure is a bit high. Any tips on how to start?</p>
                        </div>

                        <div style={{ background: 'var(--primary-teal)', color: '#fff', padding: '10px', borderRadius: '10px', maxWidth: '80%', alignSelf: 'flex-end' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700 }}>AI Assistant (Bot)</span>
                          <p style={{ fontSize: '12px', marginTop: '2px' }}>Hi Kabir! We recommend starting on the lowest "Sensitive" mode setting, holding it upright over a washbasin first.</p>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input type="text" className="form-input" placeholder="Type reply message as Aman Sharma..." id="chat-txt" />
                      <button className="btn-primary" onClick={() => {
                        const txt = document.getElementById('chat-txt').value.trim();
                        if (!txt) return;
                        addToast('Chat Message Sent', 'Transmitted directly to customer browser window.');
                        document.getElementById('chat-txt').value = '';
                      }}><Send size={16} /></button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 12: SECURITY AUDITS & ACTIVITY TRAILS */}
          {activeTab === 'audits' && (
            <div>
              <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={28} color={brandColor} /> System Audits & Security Logs Ledger</h1>
                  <p className="page-subtitle">Real-time audit trailing tracks administrative operations, catalog mutations, settings overrides, and staff logins.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-secondary" style={{ gap: '6px', cursor: 'pointer' }} onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute("href",     dataStr);
                    downloadAnchor.setAttribute("download", "perfora_audit_trail_export.json");
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                    addToast('📄 Audit Log Exported', 'Downloaded secure audit ledger snapshot locally.');
                  }}>
                    <Download size={14} /> Export Logs
                  </button>
                  <button className="btn-primary" style={{ gap: '6px', cursor: 'pointer' }} onClick={() => {
                    logAudit('Database Backup', 'Initiated manual database snapshot tarball.', 'Aman Shukla', 'Lead D2C Architect');
                    addToast('💾 Database Snapshot Triggered', 'Encrypted cloud backup bundle has been synced successfully.');
                  }}>
                    <Database size={14} /> Force DB Backup
                  </button>
                </div>
              </div>

              {/* Filtering Controls */}
              <div style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                marginBottom: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Search Activity Logs</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Search by details, order ID, AWB..."
                    value={auditSearchQuery}
                    onChange={(e) => setAuditSearchQuery(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Filter by Staff Member</label>
                  <select
                    className="form-select"
                    value={auditStaffFilter}
                    onChange={(e) => setAuditStaffFilter(e.target.value)}
                  >
                    <option value="all">All Staff Members</option>
                    <option value="Aman Shukla">Aman Shukla (Lead Architect)</option>
                    <option value="Jatan Bawa">Jatan Bawa (Co-Founder)</option>
                    <option value="Tushar Khurana">Tushar Khurana (Co-Founder)</option>
                    <option value="Rajesh Mishra">Rajesh Mishra (Warehouse Manager)</option>
                    <option value="Neha Gupta">Neha Gupta (Marketing)</option>
                    <option value="Sakshi Pandey">Sakshi Pandey (Delhi WH)</option>
                    <option value="Harini Srinivasan">Harini Srinivasan (Mumbai WH)</option>
                    <option value="Arjun Singhania">Arjun Singhania (Security)</option>
                    <option value="Meera Iyer">Meera Iyer (Finance)</option>
                    <option value="Nandini Sen">Nandini Sen (Billing Support)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Filter by Action Type</label>
                  <select
                    className="form-select"
                    value={auditActionFilter}
                    onChange={(e) => setAuditActionFilter(e.target.value)}
                  >
                    <option value="all">All Operations Types</option>
                    <option value="prepaid">Prepaid Marked</option>
                    <option value="config">Configuration / Settings</option>
                    <option value="catalog">Catalog / Products CRUD</option>
                    <option value="logistics">Warehouse & AWBs</option>
                    <option value="backup">DB Backups</option>
                    <option value="security">Security Audits</option>
                  </select>
                </div>
              </div>

              {/* Logs Table Card */}
              <div className="card" style={{ overflow: 'hidden' }}>
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="card-title">Live Audit Trail Feed</h3>
                  <span style={{ fontSize: '12px', background: 'rgba(var(--primary-teal-rgb), 0.1)', color: 'var(--primary-teal)', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                    ⚡ Real-time Encrypted Integrity Ledger Active
                  </span>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-cream)', borderBottom: '1px solid var(--border-light)' }}>
                        <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>Timestamp</th>
                        <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>Staff Operator</th>
                        <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>Action Segment</th>
                        <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>IP Coordinates</th>
                        <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>Details & Telemetry Summary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs
                        .filter(log => {
                          const searchStr = `${log.staffName} ${log.action} ${log.details} ${log.ip}`.toLowerCase();
                          if (auditSearchQuery && !searchStr.includes(auditSearchQuery.toLowerCase())) return false;

                          if (auditStaffFilter !== 'all' && log.staffName !== auditStaffFilter) return false;

                          if (auditActionFilter !== 'all') {
                            const act = log.action.toLowerCase();
                            if (auditActionFilter === 'prepaid' && !act.includes('paid')) return false;
                            if (auditActionFilter === 'config' && !act.includes('config') && !act.includes('settings')) return false;
                            if (auditActionFilter === 'catalog' && !act.includes('product') && !act.includes('catalog')) return false;
                            if (auditActionFilter === 'logistics' && !act.includes('routing') && !act.includes('awb') && !act.includes('dispatch') && !act.includes('stock') && !act.includes('ingress')) return false;
                            if (auditActionFilter === 'backup' && !act.includes('backup')) return false;
                            if (auditActionFilter === 'security' && !act.includes('security')) return false;
                          }
                          return true;
                        })
                        .map((log, index) => {
                          let badgeBg = 'rgba(107, 114, 128, 0.1)';
                          let badgeColor = 'rgb(107, 114, 128)';
                          const act = log.action.toLowerCase();
                          if (act.includes('paid') || act.includes('prepaid') || act.includes('refund')) {
                            badgeBg = 'rgba(16, 185, 129, 0.1)';
                            badgeColor = '#10B981';
                          } else if (act.includes('config') || act.includes('saved')) {
                            badgeBg = 'rgba(59, 130, 246, 0.1)';
                            badgeColor = '#3B82F6';
                          } else if (act.includes('security') || act.includes('whitelist')) {
                            badgeBg = 'rgba(239, 68, 68, 0.1)';
                            badgeColor = '#EF4444';
                          } else if (act.includes('backup') || act.includes('db')) {
                            badgeBg = 'rgba(139, 92, 246, 0.1)';
                            badgeColor = '#8B5CF6';
                          } else if (act.includes('stock') || act.includes('ingress') || act.includes('awb') || act.includes('shipped')) {
                            badgeBg = 'rgba(245, 158, 11, 0.1)';
                            badgeColor = '#F59E0B';
                          }

                          return (
                            <tr key={index} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 0.2s' }} className="hover-row">
                              <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 500 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <Clock size={12} /> {log.timestamp}
                                </div>
                              </td>
                              <td style={{ padding: '12px 16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: 'var(--bg-cream)',
                                    border: '1px solid var(--border-light)',
                                    color: 'var(--primary-teal)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '11px',
                                    fontWeight: 700
                                  }}>
                                    {log.staffName.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div>
                                    <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '13px' }}>{log.staffName}</strong>
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      {log.staffRole || 'Operator'}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '12px 16px' }}>
                                <span style={{
                                  fontSize: '10px',
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                  background: badgeBg,
                                  color: badgeColor,
                                  padding: '4px 8px',
                                  borderRadius: '6px'
                                }}>
                                  {log.action}
                                </span>
                              </td>
                              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: 'var(--text-muted)', fontWeight: 600 }}>
                                🖥️ {log.ip}
                              </td>
                              <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.4 }}>
                                {log.details}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: Q-COMMERCE PARTNERS INTEGRATION */}
          {activeTab === 'partners' && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={28} color={brandColor} /> Q-Commerce Partners & Warehousing</h1>
                  <p className="page-subtitle">Manage high-frequency API stock synchronizations, central warehouse node dispatches, and quick-commerce channels telemetry (Blinkit, Zepto, Swiggy Instamart, Amazon Fresh).</p>
                </div>
              </div>

              {/* Status Row */}
              <div className="analytics-grid" style={{ marginBottom: '20px' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #FFD424' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <span style={{ background: '#FFD424', color: '#000', width: '18px', height: '18px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifycontent: 'center', fontSize: '11px', fontWeight: 900, fontFamily: 'sans-serif', lineHeight: 1 }}>b</span>
                        <strong>blinkit</strong> Integration
                      </span>
                      <h3 className="stat-value" style={{ fontSize: '20px', marginTop: '4px' }}>Gurgaon / NCR Hubs</h3>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span> Active
                    </span>
                  </div>
                  <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <span>Live Stock: <strong>4,250 units</strong></span>
                    <span>API Latency: <strong>4ms</strong></span>
                  </div>
                </div>

                <div className="stat-card" style={{ borderLeft: '4px solid #E42575' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <span style={{ background: '#E42575', color: '#fff', width: '18px', height: '18px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifycontent: 'center', fontSize: '11px', fontWeight: 900, fontFamily: 'sans-serif', lineHeight: 1 }}>z</span>
                        <strong>zepto</strong> Integration
                      </span>
                      <h3 className="stat-value" style={{ fontSize: '20px', marginTop: '4px' }}>Mumbai Bandra Hub</h3>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span> Active
                    </span>
                  </div>
                  <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <span>Live Stock: <strong>3,920 units</strong></span>
                    <span>API Latency: <strong>8ms</strong></span>
                  </div>
                </div>

                <div className="stat-card" style={{ borderLeft: '4px solid #FC8019' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <span style={{ background: '#FC8019', color: '#fff', width: '18px', height: '18px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifycontent: 'center', fontSize: '11px', fontWeight: 900, fontFamily: 'sans-serif', lineHeight: 1 }}>i</span>
                        <strong>instamart</strong> Sync
                      </span>
                      <h3 className="stat-value" style={{ fontSize: '20px', marginTop: '4px' }}>Bangalore Hubs</h3>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3B82F6', display: 'inline-block', animation: 'pulse 1.5s infinite' }}></span> Syncing...
                    </span>
                  </div>
                  <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <span>Live Stock: <strong>5,100 units</strong></span>
                    <span>API Latency: <strong>12ms</strong></span>
                  </div>
                </div>

                <div className="stat-card" style={{ borderLeft: '4px solid #131921' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <span style={{ background: '#131921', color: '#FF9900', width: '18px', height: '18px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifycontent: 'center', fontSize: '11px', fontWeight: 900, fontFamily: 'sans-serif', lineHeight: 1 }}>a</span>
                        <strong>amazon fresh</strong> Node
                      </span>
                      <h3 className="stat-value" style={{ fontSize: '20px', marginTop: '4px' }}>Pan-India Nodes</h3>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span> Active
                    </span>
                  </div>
                  <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <span>Live Stock: <strong>12,450 units</strong></span>
                    <span>API Latency: <strong>22ms</strong></span>
                  </div>
                </div>
              </div>

              {/* Replenish & Logs Columns */}
              <div className="dashboard-grid">
                
                {/* 1. Manual Replenishment Dispatcher */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Warehouse Replenishment Dispatcher</h3>
                  </div>
                  <div className="card-body">
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                      Authorize real-time physical stock transfers from Perfora Central Warehouses directly to Q-Commerce partner dark stores. This action will deduct central inventory instantly.
                    </p>
                    <form onSubmit={handlePartnerDispatchSubmit}>
                      <div className="form-group">
                        <label className="form-label">Q-Commerce Channel</label>
                        <select 
                          className="form-select"
                          value={dispatchForm.partner}
                          onChange={(e) => {
                            const p = e.target.value;
                            const h = p === 'Blinkit' ? 'Gurgaon Sector-45 Hub' : 
                                      p === 'Zepto' ? 'Bandra West Hub' : 
                                      p === 'Swiggy Instamart' ? 'Koramangala 4th Block Hub' : 'New Delhi Fulfilment Center';
                            setDispatchForm(prev => ({ ...prev, partner: p, hub: h }));
                          }}
                        >
                          <option value="Blinkit">Blinkit</option>
                          <option value="Zepto">Zepto</option>
                          <option value="Swiggy Instamart">Swiggy Instamart</option>
                          <option value="Amazon Fresh">Amazon Fresh</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Target Partner Hub / Dark Store</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={dispatchForm.hub} 
                          onChange={(e) => setDispatchForm(prev => ({ ...prev, hub: e.target.value }))}
                          placeholder="e.g. Gurgaon Sector-45 Hub"
                          required
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                          <label className="form-label">Source Warehouse</label>
                          <select 
                            className="form-select"
                            value={dispatchForm.source}
                            onChange={(e) => setDispatchForm(prev => ({ ...prev, source: e.target.value }))}
                          >
                            <option value="Delhi">Delhi Central WH</option>
                            <option value="Mumbai">Mumbai Central WH</option>
                            <option value="Bangalore">Bangalore Central WH</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Replenish Quantity</label>
                          <input 
                            type="number" 
                            className="form-input" 
                            value={dispatchForm.quantity} 
                            onChange={(e) => setDispatchForm(prev => ({ ...prev, quantity: e.target.value }))}
                            min="1"
                            max="5000"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Product to Dispatch</label>
                        <select 
                          className="form-select"
                          value={dispatchForm.productId}
                          onChange={(e) => setDispatchForm(prev => ({ ...prev, productId: e.target.value }))}
                        >
                          {products.map(p => (
                            <option key={p.id} value={p.id}>{p.title} (Stock: {p.inventory})</option>
                          ))}
                        </select>
                      </div>

                      <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px', cursor: 'pointer' }}>
                        <Upload size={16} /> Authorize Replenishment Dispatch
                      </button>
                    </form>
                  </div>
                </div>

                {/* 2. Dispatch Logs & Tracking */}
                <div className="card">
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className="card-title">Active Dispatches & Transit Logs</h3>
                    <span style={{ fontSize: '10px', background: 'rgba(var(--primary-teal-rgb), 0.1)', color: 'var(--primary-teal)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                      Real-time Delhivery API
                    </span>
                  </div>
                  <div className="card-body" style={{ padding: 0 }}>
                    <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                      {partnerReplenishments.map((rep) => {
                        let statusColor = '#F59E0B';
                        let statusText = 'In Transit';
                        if (rep.status === 'delivered') {
                          statusColor = '#10B981';
                          statusText = 'Delivered & Sync\'d';
                        }

                        return (
                          <div key={rep.id} style={{
                            padding: '14px 16px',
                            borderBottom: '1px solid var(--border-light)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '12px'
                          }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  color: rep.partner === 'Blinkit' ? '#B8860B' : 
                                         rep.partner === 'Zepto' ? '#E42575' : 
                                         rep.partner === 'Swiggy Instamart' ? '#FC8019' : '#3B82F6',
                                  background: rep.partner === 'Blinkit' ? 'rgba(255, 212, 36, 0.12)' : 
                                              rep.partner === 'Zepto' ? 'rgba(228, 37, 117, 0.12)' : 
                                              rep.partner === 'Swiggy Instamart' ? 'rgba(252, 128, 25, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px'
                                }}>
                                  <span style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '3px',
                                    background: rep.partner === 'Blinkit' ? '#FFD424' : 
                                                rep.partner === 'Zepto' ? '#E42575' : 
                                                rep.partner === 'Swiggy Instamart' ? '#FC8019' : '#131921',
                                    color: rep.partner === 'Blinkit' ? '#000' : '#fff',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '8px',
                                    fontWeight: 900,
                                    lineHeight: 1
                                  }}>
                                    {rep.partner === 'Blinkit' ? 'b' : 
                                     rep.partner === 'Zepto' ? 'z' : 
                                     rep.partner === 'Swiggy Instamart' ? 'i' : 'a'}
                                  </span>
                                  {rep.partner}
                                </span>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{rep.id}</span>
                              </div>
                              <h4 style={{ fontSize: '13px', margin: '4px 0 2px 0', fontWeight: 600, color: 'var(--text-primary)' }}>{rep.product}</h4>
                              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
                                {rep.source} ➡️ {rep.hub} | Qty: <strong>{rep.quantity}</strong>
                              </p>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                              <span style={{
                                display: 'inline-block',
                                fontSize: '10px',
                                fontWeight: 700,
                                color: statusColor,
                                border: `1px solid ${statusColor}`,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                textTransform: 'uppercase'
                              }}>{statusText}</span>
                              <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>⏱️ {rep.timestamp}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 11: SYSTEM SETTINGS */}
          {activeTab === 'settings' && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title"><Settings size={28} color={brandColor} /> Settings & Security Controls</h1>
                  <p className="page-subtitle">Configure integrated payment gateways, IP Whitelisting rules, API webhooks, and Role-Based Access Controls (RBAC).</p>
                </div>
              </div>

              <div className="dashboard-grid">
                
                {/* Gateways and keys */}
                <div className="card">
                  <div className="card-header"><h3 className="card-title">Payment Gateways & Integrations</h3></div>
                  <div className="card-body">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-cream)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                        <div>
                          <strong>Razorpay Payments SDK</strong> <br/>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>UPI, Netbanking, Credit Cards, Simpl BNPL Integration</span>
                        </div>
                        <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                          <input type="checkbox" checked={razorpayGatewayEnabled} style={{ opacity: 0, width: 0, height: 0 }} onChange={(e) => {
                            setRazorpayGatewayEnabled(e.target.checked);
                            addToast('Razorpay Port Changed', `Standard gateway state toggled to ${e.target.checked}`);
                            logAudit('Gateway Settings Edited', `Toggled Razorpay gateway to ${e.target.checked}`);
                          }} />
                          <span className="slider round" style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: razorpayGatewayEnabled ? brandColor : 'var(--border-light)', borderRadius: '34px', transition: '.4s' }}></span>
                        </label>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-cream)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                        <div>
                          <strong>Stripe Global Merchants Gateway</strong> <br/>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Used for international currency checkouts (DDU/DDP)</span>
                        </div>
                        <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                          <input type="checkbox" checked={stripeGatewayEnabled} style={{ opacity: 0, width: 0, height: 0 }} onChange={(e) => {
                            setStripeGatewayEnabled(e.target.checked);
                            addToast('Stripe Channel Toggled', `Stripe checkout ports set to ${e.target.checked}`);
                            logAudit('Gateway Settings Edited', `Toggled Stripe global gateway to ${e.target.checked}`);
                          }} />
                          <span className="slider round" style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: stripeGatewayEnabled ? brandColor : 'var(--border-light)', borderRadius: '34px', transition: '.4s' }}></span>
                        </label>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Authorized Whitelisted IPs (Brute force protection)</label>
                        <input type="text" className="form-input" value={whitelistedIps} onChange={(e) => setWhitelistedIps(e.target.value)} />
                      </div>

                      <button className="btn-primary" onClick={() => {
                        localStorage.setItem('perfora_whitelisted_ips', whitelistedIps);
                        addToast('Network Settings Saved', 'Server IP filters updated and persisted.');
                        logAudit('IP Whitelist Updated', `Authorized IPs saved: ${whitelistedIps}`);
                      }}>
                        Save Whitelisted IPs
                      </button>

                    </div>
                  </div>
                </div>

                {/* Staff RBAC */}
                <div className="card">
                  <div className="card-header"><h3 className="card-title">Staff Role-Based Permissions (RBAC)</h3></div>
                  <div className="card-body">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                        <span><strong>Staff Member</strong></span>
                        <span><strong>Role Permission</strong></span>
                      </div>
                      
                      <div style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {staffList.map((st) => (
                          <div key={st.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ 
                                display: 'inline-flex', 
                                width: '28px', 
                                height: '28px', 
                                borderRadius: '50%', 
                                background: st.type === 'Master' ? 'rgba(var(--primary-teal-rgb), 0.1)' : 'var(--bg-cream)', 
                                color: 'var(--primary-teal)', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                fontSize: '10px', 
                                fontWeight: 700,
                                border: '1px solid var(--border-light)'
                              }}>
                                {st.name.split(' ').map(n => n[0]).join('')}
                              </span>
                              <strong>{st.name}</strong>
                            </div>
                            <span style={{ 
                              color: st.type === 'Master' ? 'var(--primary-teal)' : 'var(--text-muted)', 
                              fontWeight: st.type === 'Master' || st.name === 'Aman Shukla' ? 600 : 400,
                              fontSize: '12px',
                              textAlign: 'right',
                              maxWidth: '65%'
                            }}>
                              {st.role}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: '16px', padding: '12px', background: 'var(--accent-coral-light)', color: 'var(--accent-coral)', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontWeight: 600 }}>
                        🔒 2-Factor Authentication (2FA) is enforced globally for all backend staff accounts.
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </main>

      {/* ==========================================
          TOAST SYSTEM CONTAINER
          ========================================== */}
      <div className="toast-container">
        {toasts.map(t => (
          <div className="toast" key={t.id}>
            <div className="toast-content">
              <div className="toast-title">{t.title}</div>
              <div className="toast-desc">{t.desc}</div>
            </div>
            <button className="toast-close" onClick={() => setToasts(prev => prev.filter(item => item.id !== t.id))}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* ==========================================
          MODALS & DETAILS DIALOGS
          ========================================== */}

      {/* 1. ORDER DETAIL MODAL DRAWER */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Detailed Order Ledger — {selectedOrder.id}</h2>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Customer Information</h4>
                  <p style={{ fontSize: '13px' }}>
                    <strong>Name:</strong> {selectedOrder.customer} <br/>
                    <strong>Email:</strong> {selectedOrder.email} <br/>
                    <strong>Phone:</strong> {selectedOrder.phone} <br/>
                    <strong>Shipping Address:</strong> {selectedOrder.address}
                  </p>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Order Logistics Info</h4>
                  <p style={{ fontSize: '13px' }}>
                    <strong>Timestamp:</strong> {new Date(selectedOrder.date).toLocaleString()} <br/>
                    <strong>Carrier:</strong> Delhivery Domestic <br/>
                    <strong>Warehouse Source:</strong> {selectedOrder.warehouse} Warehouse <br/>
                    <strong>Payment Method:</strong> {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})
                  </p>
                </div>
              </div>

              <div style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '16px', background: 'var(--bg-cream)', marginBottom: '20px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: '10px' }}>Purchased Oral Care Items</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px', marginBottom: '6px' }}>
                  <span>{selectedOrder.items}</span>
                  <strong>₹{selectedOrder.total}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <span>CGST 9% + SGST 9% (Included)</span>
                  <span>₹{Math.floor(selectedOrder.total * 0.18)}</span>
                </div>
              </div>

              {selectedOrder.awb && (
                <div style={{ border: '1px dashed var(--primary-teal)', padding: '12px', borderRadius: 'var(--radius-sm)', background: 'rgba(var(--primary-teal-rgb), 0.03)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-teal)' }}>🏷️ Delhivery Shipping Manifest Printed</span>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Tracking AWB code is registered in Indian Logistics hub systems. Shipment is in transit.
                  </p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => {
                addToast('Invoice Printed', `B2B compliant tax invoice generated for ${selectedOrder.id}`);
              }}><Printer size={14} /> Print Invoice</button>
              
              {selectedOrder.status === 'pending' && (
                <button className="btn-primary" onClick={() => {
                  handleFulfillOrder(selectedOrder.id);
                  setSelectedOrder(null);
                }}>Approve Fulfillment</button>
              )}

              {selectedOrder.paymentStatus === 'unpaid' && (
                <button className="btn-primary" style={{ backgroundColor: '#10B981' }} onClick={() => {
                  handleMarkAsPaid(selectedOrder.id);
                  setSelectedOrder(null);
                }}>Mark as Paid</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCT ADD/EDIT MODAL */}
      {productModalOpen && editingProduct && (
        <div className="modal-overlay" onClick={() => setProductModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSaveProduct}>
              <div className="modal-header">
                <h2 className="modal-title">{products.some(p => p.id === editingProduct.id) ? 'Edit Product Metrics' : 'Add New Oral Care Product'}</h2>
                <button className="modal-close" type="button" onClick={() => setProductModalOpen(false)}><X size={18} /></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Product Name / Title</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={editingProduct.title}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    placeholder="e.g. Perfora Truthpaste (Mint)"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    >
                      <option>Brush</option>
                      <option>Toothpaste</option>
                      <option>Mouthwash</option>
                      <option>Whitening</option>
                      <option>Flosser</option>
                      <option>Bundles</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">SKU Code</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={editingProduct.sku}
                      onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value.toUpperCase() })}
                      placeholder="e.g. PF-TP-MINT"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Base Price (₹)</label>
                    <input
                      type="number"
                      required
                      className="form-input"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Sale/Discount Price (₹)</label>
                    <input
                      type="number"
                      required
                      className="form-input"
                      value={editingProduct.salePrice}
                      onChange={(e) => setEditingProduct({ ...editingProduct, salePrice: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Cost per Item (₹ for Margin calculations)</label>
                    <input
                      type="number"
                      required
                      className="form-input"
                      value={editingProduct.cost}
                      onChange={(e) => setEditingProduct({ ...editingProduct, cost: parseFloat(e.target.value) || 0 })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Initial Inventory Quantity</label>
                    <input
                      type="number"
                      required
                      className="form-input"
                      value={editingProduct.inventory}
                      onChange={(e) => setEditingProduct({ ...editingProduct, inventory: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Product Short Description</label>
                  <textarea
                    className="form-textarea"
                    rows="2"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    placeholder="Short description..."
                  />
                </div>

                <div style={{ padding: '10px 14px', background: 'var(--bg-cream)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '11px', display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>Auto-Calculated Margin:</span>
                  <span style={{ color: '#10B981' }}>
                    ₹{editingProduct.salePrice - editingProduct.cost} ({(((editingProduct.salePrice - editingProduct.cost) / (editingProduct.salePrice || 1)) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" type="button" onClick={() => setProductModalOpen(false)}>Cancel</button>
                <button className="btn-primary" type="submit">Commit to Catalog</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. STOREFRONT PREVIEW MODAL */}
      {storePreviewOpen && (
        <div className="modal-overlay" onClick={() => setStorePreviewOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '850px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ borderBottom: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={18} color="var(--primary-teal)" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Interactive Perfora D2C Frontend Simulator</h3>
              </div>
              <button className="modal-close" onClick={() => setStorePreviewOpen(false)}><X size={18} /></button>
            </div>
            
            <div className="modal-body" style={{ background: '#FAFDFC', borderRadius: 'var(--radius-md)', padding: '24px', margin: '0 24px 24px 24px', border: '1px solid var(--border-light)' }}>
              
              {/* Fake navigation header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '20px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: brandColor, fontSize: '18px' }}>perfora</div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  <span>Toothpaste</span>
                  <span>Electric Brush</span>
                  <span>Mouthwash</span>
                  <span>Whitening Kits</span>
                </div>
                <div style={{ fontSize: '12px', background: 'var(--primary-teal)', color: '#fff', padding: '4px 10px', borderRadius: '4px' }}>Cart (0)</div>
              </div>

              {/* Grid of buyable items */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {products.map(p => (
                  <div key={p.id} style={{ background: '#fff', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
                    <div>
                      <div style={{ height: '100px', background: 'var(--bg-cream)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: brandColor, marginBottom: '10px' }}>PF SHOP</div>
                      <h4 style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.2 }}>{p.title}</h4>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{p.description}</p>
                    </div>
                    
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: brandColor }}>₹{p.salePrice}</span>
                        <span style={{ fontSize: '11px', textDecoration: 'line-through', color: 'var(--text-muted)' }}>₹{p.price}</span>
                      </div>

                      <button 
                        className="btn-primary" 
                        style={{ width: '100%', padding: '6px', fontSize: '11px', justifyContent: 'center' }}
                        onClick={() => {
                          // Simulate buying this product
                          const firstName = VISITOR_FIRST_NAMES[Math.floor(Math.random() * VISITOR_FIRST_NAMES.length)];
                          const lastName = VISITOR_LAST_NAMES[Math.floor(Math.random() * VISITOR_LAST_NAMES.length)];
                          const customerName = `${firstName} ${lastName}`;
                          const orderId = `P2026${Math.floor(1000000 + Math.random() * 9000000)}`;
                          
                          const simulatedPurchaseOrder = {
                            id: orderId,
                            customer: customerName,
                            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
                            phone: `+91 99999 ${Math.floor(10000 + Math.random() * 89999)}`,
                            items: `${p.title} x1`,
                            total: p.salePrice,
                            status: 'pending',
                            paymentStatus: 'paid',
                            date: new Date().toISOString(),
                            address: `Flat H-502, Prestige Estate, Bangalore, 560103`,
                            paymentMethod: 'UPI',
                            awb: '',
                            warehouse: 'Bangalore'
                          };

                          setOrders(prev => [simulatedPurchaseOrder, ...prev].slice(0, 120));
                          setProducts(prev => prev.map(item => item.id === p.id ? { ...item, inventory: Math.max(0, item.inventory - 1) } : item));
                          setTotalOrderCount(prev => prev + 1);
                          setTotalSalesCount(prev => prev + p.salePrice);
                          
                          addToast(
                            '🛍️ Direct Customer Checkout!',
                            `${customerName} purchased ${p.title} via UPI. Order registered.`
                          );
                          logAudit('D2C Checkout Simulated', `Simulated direct user purchase of ${p.sku} (Order ${orderId})`);
                          setStorePreviewOpen(false);
                        }}
                      >
                        Simulate Direct Buy
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 4. OTP SECURE COD VERIFICATION MODAL */}
      {otpVerificationOpen && selectedOrder && (
        <div className="modal-overlay" onClick={() => setOtpVerificationOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">🔐 COD Secure OTP Check</h2>
              <button className="modal-close" onClick={() => setOtpVerificationOpen(false)}><X size={18} /></button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <AlertTriangle size={36} color="var(--accent-coral)" style={{ marginBottom: '12px' }} />
              <h4 style={{ marginBottom: '6px' }}>Verify Order {selectedOrder.id}</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                We sent a secure validation PIN code to customer <strong>{selectedOrder.customer}</strong> at phone number <strong>{selectedOrder.phone}</strong>.
              </p>

              <div style={{ background: 'var(--bg-cream)', padding: '8px', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '11px', marginBottom: '16px', color: 'var(--primary-teal)', fontWeight: 600 }}>
                💡 Tech Hint: Enter <strong>"9988"</strong> or <strong>"1234"</strong> to simulate successful verification.
              </div>

              <input
                type="text"
                className="form-input"
                placeholder="Enter 4-Digit Verification OTP..."
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                maxLength={4}
                style={{ textAlign: 'center', fontSize: '20px', letterSpacing: '4px', maxWidth: '200px', margin: '0 auto' }}
              />
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={() => setOtpVerificationOpen(false)}>Dismiss</button>
              <button className="btn-primary" onClick={handleConfirmOtp}>Validate Order Check</button>
            </div>
          </div>
        </div>
      )}

      {/* 5. CRM STORE CREDIT BALANCE MODAL */}
      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-content" style={{ maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Store Credit Ledger — {selectedCustomer.name}</h2>
              <button className="modal-close" onClick={() => setSelectedCustomer(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '13px', marginBottom: '16px' }}>
                Modify store credit balance for customer profile. Current Balance: <strong>₹{selectedCustomer.credit}</strong>.
              </p>
              
              <div className="form-group">
                <label className="form-label">Adjustment Amount (₹)</label>
                <input type="number" className="form-input" defaultValue="100" id="credit-adj-val" />
              </div>

              <div className="form-group">
                <label className="form-label">Adjustment Direction</label>
                <select className="form-select" id="credit-adj-dir">
                  <option value="add">Add Store Credit (+)</option>
                  <option value="deduct">Deduct Store Credit (-)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Internal Reason Log</label>
                <input type="text" className="form-input" defaultValue="Customer loyalty token grant" id="credit-adj-reason" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedCustomer(null)}>Cancel</button>
              <button className="btn-primary" onClick={() => {
                const val = parseFloat(document.getElementById('credit-adj-val').value) || 0;
                const dir = document.getElementById('credit-adj-dir').value;
                const reason = document.getElementById('credit-adj-reason').value;

                setCustomers(prev => prev.map(c => {
                  if (c.id === selectedCustomer.id) {
                    const newCredit = dir === 'add' ? c.credit + val : Math.max(0, c.credit - val);
                    return { ...c, credit: newCredit };
                  }
                  return c;
                }));

                addToast('Store Credit Updated', `Successfully updated balance of ${selectedCustomer.name}`);
                logAudit('Store Credit Adjusted', `Adjusted balance for ${selectedCustomer.email} by ${dir === 'add' ? '+' : '-'}${val} (${reason})`);
                setSelectedCustomer(null);
              }}>Commit Adjustment</button>
            </div>
          </div>
        </div>
      )}

      {/* 6. CREATE BACKEND ORDER MODAL */}
      {createOrderModalOpen && (
        <div className="modal-overlay" onClick={() => setCreateOrderModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                <ShoppingCart size={18} color="var(--primary-teal)" />
                Create Manual Backend Order
              </h2>
              <button className="modal-close" onClick={() => setCreateOrderModalOpen(false)}><X size={18} /></button>
            </div>
            
            <form onSubmit={handleCreateBackendOrder}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: 'rgba(var(--primary-teal-rgb), 0.05)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '11px', color: 'var(--primary-teal)', fontWeight: 600, border: '1px solid var(--border-light)' }}>
                  💡 This registers a premium manual order directly through the co-founder secure channel.
                </div>

                <div className="form-group">
                  <label className="form-label">Customer Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Rahul Sharma" 
                    className="form-input"
                    value={newOrderForm.customer}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, customer: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Customer Email *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. rahul@gmail.com" 
                      className="form-input"
                      value={newOrderForm.email}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. +91 99887 76655" 
                      className="form-input"
                      value={newOrderForm.phone}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Select SKU Item *</label>
                  <select 
                    className="form-select"
                    required
                    value={newOrderForm.productId}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, productId: e.target.value })}
                  >
                    <option value="" disabled>-- Choose a Brand Product --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} - ₹{p.salePrice} (Stock: {p.inventory})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Quantity *</label>
                    <input 
                      type="number" 
                      required 
                      min="1" 
                      className="form-input"
                      value={newOrderForm.quantity}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, quantity: parseInt(e.target.value) || 1 })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Delivery Warehouse *</label>
                    <select 
                      className="form-select"
                      value={newOrderForm.warehouse}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, warehouse: e.target.value })}
                    >
                      <option>Delhi</option>
                      <option>Mumbai</option>
                      <option>Bangalore</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Payment Method *</label>
                    <select 
                      className="form-select"
                      value={newOrderForm.paymentMethod}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, paymentMethod: e.target.value })}
                    >
                      <option>UPI</option>
                      <option>COD</option>
                      <option>Razorpay Card</option>
                      <option>Netbanking</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Payment Status *</label>
                    <select 
                      className="form-select"
                      value={newOrderForm.paymentStatus}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, paymentStatus: e.target.value })}
                    >
                      <option value="paid">Paid</option>
                      <option value="unpaid">Unpaid / COD Pending</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Delivery Address *</label>
                  <textarea 
                    className="form-textarea" 
                    required 
                    rows="2"
                    placeholder="e.g. Flat 402, Elite Residency, Sector-56, Gurgaon, Haryana, 122011"
                    value={newOrderForm.address}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, address: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="modal-footer">
                <button className="btn-secondary" type="button" onClick={() => setCreateOrderModalOpen(false)}>Cancel</button>
                <button className="btn-primary" type="submit">Create & Dispatch Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. ORDER DISPATCH SUCCESS & SMS TRACKING CONFIRMATION CARD */}
      {createdOrderSuccessInfo && (
        <div className="modal-overlay" onClick={() => setCreatedOrderSuccessInfo(null)}>
          <div className="modal-content" style={{ maxWidth: '460px', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '50%', 
                background: 'rgba(16, 185, 129, 0.1)', 
                color: '#10B981', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '12px' 
              }}>
                <CheckCircle size={32} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                Order Dispatched Successfully!
              </h2>
              <span style={{ fontSize: '12px', background: 'var(--bg-cream)', padding: '2px 8px', borderRadius: '4px', color: 'var(--primary-teal)', fontWeight: 700, fontFamily: 'monospace' }}>
                ID: {createdOrderSuccessInfo.id}
              </span>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: 0 }}>
              
              {/* Customer Mobile SMS Notification Mock */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>📲 MOBILE SMS NOTIFICATION SENT:</span>
                <div style={{ 
                  background: 'var(--bg-cream)', 
                  border: '1px solid var(--border-light)', 
                  borderRadius: '12px', 
                  padding: '14px',
                  position: 'relative',
                  fontFamily: 'system-ui, sans-serif'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                    <span>Sender: VK-PERFORA</span>
                    <span>Just Now</span>
                  </div>
                  <p style={{ fontSize: '12px', margin: 0, lineHeight: 1.4, color: 'var(--text-primary)' }}>
                    "Hi <strong>{createdOrderSuccessInfo.customer}</strong>, thank you for choosing Perfora Care! Your manual order <strong>{createdOrderSuccessInfo.id}</strong> has been confirmed directly by our Lead D2C Architect. Your order will be created and processed inside <strong>24 hours</strong>. Live Delhivery carrier tracking details and your personal AWB tracking link will be shared instantly via SMS & WhatsApp upon packaging dispatch!"
                  </p>
                  <div style={{ 
                    position: 'absolute', 
                    left: '-6px', 
                    top: '18px', 
                    width: '12px', 
                    height: '12px', 
                    background: 'var(--bg-cream)', 
                    borderLeft: '1px solid var(--border-light)', 
                    borderBottom: '1px solid var(--border-light)', 
                    transform: 'rotate(45deg)' 
                  }}></div>
                </div>
              </div>

              {/* Internal Ops Info */}
              <div style={{ 
                background: 'rgba(var(--primary-teal-rgb), 0.04)', 
                border: '1px solid var(--border-light)', 
                borderRadius: 'var(--radius-sm)', 
                padding: '12px', 
                fontSize: '11px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Operations Warehouse:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{createdOrderSuccessInfo.warehouse} WH Node</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Customer Phone Alert:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{createdOrderSuccessInfo.phone}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>SLA Dispatch Target:</span>
                  <strong style={{ color: '#10B981' }}>Within 24 Hours (Guaranteed)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Logistics Integration:</span>
                  <strong style={{ color: 'var(--primary-teal)' }}>Awaiting AWB Generation</strong>
                </div>
              </div>

            </div>

            <div className="modal-footer" style={{ borderTop: 'none', padding: '16px 0 0 0', marginTop: '16px' }}>
              <button 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '10px' }} 
                onClick={() => setCreatedOrderSuccessInfo(null)}
              >
                Acknowledge & Sync Feed
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
