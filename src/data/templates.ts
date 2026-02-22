export interface TemplateElement {
    id: string;
    type: string;
    tag: string;
    innerHTML: string;
    style: Record<string, string>;
}

export interface Template {
    id: string;
    title: string;
    category: string; // Used in Templates page
    focus: string;    // Used in Dashboard page
    image: string;
    description: string;
    designer: string;
    gridClass?: string; // For Bento Grid in Templates page
    elements: TemplateElement[];
}

export const templates: Template[] = [
    {
        id: '1',
        title: 'Minimal Portfolio',
        category: 'Portfolio',
        focus: 'Typography, Personal Brand',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop',
        description: 'Clean, typography-focused showcase for creatives.',
        designer: 'Web Builder Studio',
        gridClass: 'md:col-span-2 md:row-span-2',
        elements: [
            { id: 'h1', type: 'hero', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-24 text-center"><h1 class="text-7xl font-serif mb-6">Create Without Limits</h1><p class="text-xl text-slate-600 max-w-2xl mx-auto">Explore the intersection of design and technology with our minimalist portfolio template.</p></div>', style: { backgroundColor: '#ffffff' } },
            { id: 'f1', type: 'features', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center"><div><h3 class="text-2xl font-serif mb-4">Design</h3><p class="text-slate-500">Bespoke visual identities.</p></div><div><h3 class="text-2xl font-serif mb-4">Motion</h3><p class="text-slate-500">Fluid digital experiences.</p></div><div><h3 class="text-2xl font-serif mb-4">Strategy</h3><p class="text-slate-500">High-impact brand growth.</p></div></div>', style: { backgroundColor: '#f8f8f8' } },
            { id: 'cta1', type: 'cta', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-20 bg-slate-900 text-white rounded-3xl text-center"><h2 class="text-4xl font-serif mb-6">Ready to elevate your brand?</h2><button class="px-10 py-4 bg-white text-slate-900 rounded-full font-bold hover:scale-105 transition-transform">Get Started</button></div>', style: { backgroundColor: 'transparent' } }
        ]
    },
    {
        id: '2',
        title: 'Luxe Store',
        category: 'E-commerce',
        focus: 'Branding, Experience',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop',
        description: 'Premium shopping experience with smooth interactions.',
        designer: 'Visual Flow',
        gridClass: 'md:col-span-1 md:row-span-1',
        elements: [
            { id: 'h1', type: 'hero', tag: 'section', innerHTML: '<header class="container mx-auto px-6 py-6 flex justify-between items-center"><span class="text-2xl font-bold italic">LUXE</span><nav class="flex gap-8"><a href="#" class="text-sm font-medium hover:opacity-60">Collections</a><a href="#" class="text-sm font-medium hover:opacity-60">About</a><a href="#" class="text-sm font-medium hover:opacity-60">Contact</a></nav></header><div class="container mx-auto px-6 py-32 flex flex-col md:flex-row items-center gap-12"><div class="flex-1 text-center md:text-left"><h1 class="text-8xl font-serif leading-none mb-8">Modern Luxury</h1><p class="text-lg opacity-70 mb-8">Curated collections for the modern aesthetic.</p><button class="px-10 py-4 bg-black text-white rounded-full hover:scale-105 transition-transform">Explore Now</button></div><div class="flex-1 w-full aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-[3rem]"></div></div>', style: { backgroundColor: '#fdfbf7', color: '#1a1a1a' } },
            { id: 'products', type: 'products', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-20"><h2 class="text-4xl font-serif mb-12">Featured Collections</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="aspect-square bg-slate-200 rounded-2xl hover:scale-105 transition-transform cursor-pointer"></div><div class="aspect-square bg-slate-200 rounded-2xl hover:scale-105 transition-transform cursor-pointer"></div><div class="aspect-square bg-slate-200 rounded-2xl hover:scale-105 transition-transform cursor-pointer"></div></div></div>', style: { backgroundColor: '#ffffff' } },
            { id: 'footer', type: 'footer', tag: 'footer', innerHTML: '<div class="container mx-auto px-6 py-12 border-t border-slate-300"><div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8"><div><h4 class="font-bold mb-4">Shop</h4><ul class="space-y-2 text-sm opacity-60"><li>New Arrivals</li><li>Best Sellers</li><li>Sale</li></ul></div><div><h4 class="font-bold mb-4">Support</h4><ul class="space-y-2 text-sm opacity-60"><li>Contact</li><li>Shipping</li><li>Returns</li></ul></div><div><h4 class="font-bold mb-4">Company</h4><ul class="space-y-2 text-sm opacity-60"><li>About</li><li>Careers</li><li>Press</li></ul></div><div><h4 class="font-bold mb-4">Follow</h4><ul class="space-y-2 text-sm opacity-60"><li>Instagram</li><li>Twitter</li><li>Facebook</li></ul></div></div><div class="border-t border-slate-300 pt-8 text-center text-sm opacity-60">© 2026 Luxe. All rights reserved.</div></div>', style: { backgroundColor: '#f8f8f8' } }
        ]
    },
    {
        id: '3',
        title: 'Nexus SaaS',
        category: 'SaaS',
        focus: 'Conversion, SaaS',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
        description: 'Conversion-optimized landing page for tech products.',
        designer: 'Design Pro',
        gridClass: 'md:col-span-1 md:row-span-1',
        elements: [
            { id: 'h1', type: 'hero', tag: 'section', innerHTML: '<div class="bg-indigo-600 py-24 text-center"><div class="inline-block px-4 py-1.5 bg-indigo-500 rounded-full text-white text-xs font-bold mb-6">v2.0 IS LIVE</div><h1 class="text-6xl font-bold text-white mb-8">Nexus Engine for Teams</h1><p class="text-indigo-100 text-xl max-w-2xl mx-auto mb-10">Streamline your workflow with AI-powered task management.</p><div class="flex items-center justify-center gap-4"><button class="px-8 py-3 bg-white text-indigo-600 rounded-lg font-bold hover:scale-105 transition-transform">Try for free</button><button class="px-8 py-3 bg-indigo-700 text-white rounded-lg font-bold hover:scale-105 transition-transform">Watch demo</button></div></div>', style: { backgroundColor: '#4f46e5' } },
            { id: 'features', type: 'features', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-20"><div class="grid grid-cols-1 md:grid-cols-3 gap-12"><div class="bg-white rounded-2xl p-8 shadow-lg"><div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6"><span class="text-2xl">⚡</span></div><h3 class="text-xl font-bold mb-4">Lightning Fast</h3><p class="text-slate-600">Real-time collaboration across your entire team.</p></div><div class="bg-white rounded-2xl p-8 shadow-lg"><div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6"><span class="text-2xl">🔒</span></div><h3 class="text-xl font-bold mb-4">Enterprise Secure</h3><p class="text-slate-600">Bank-level security for your sensitive data.</p></div><div class="bg-white rounded-2xl p-8 shadow-lg"><div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6"><span class="text-2xl">📊</span></div><h3 class="text-xl font-bold mb-4">Deep Analytics</h3><p class="text-slate-600">Insights that drive smarter decisions.</p></div></div></div>', style: { backgroundColor: '#f0f4ff' } },
            { id: 'pricing', type: 'pricing', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-20 text-center"><h2 class="text-4xl font-bold mb-12">Simple, Transparent Pricing</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="bg-white border-2 border-slate-200 rounded-2xl p-8"><h3 class="text-xl font-bold mb-4">Starter</h3><div class="text-4xl font-bold text-indigo-600 mb-4">$29<span class="text-lg text-slate-600">/mo</span></div><button class="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:scale-105 transition-transform">Get Started</button></div><div class="bg-indigo-600 text-white rounded-2xl p-8 transform scale-105"><h3 class="text-xl font-bold mb-4">Professional</h3><div class="text-4xl font-bold mb-4">$99<span class="text-lg opacity-80">/mo</span></div><button class="w-full px-6 py-3 bg-white text-indigo-600 rounded-lg font-bold hover:scale-105 transition-transform">Get Started</button></div><div class="bg-white border-2 border-slate-200 rounded-2xl p-8"><h3 class="text-xl font-bold mb-4">Enterprise</h3><div class="text-4xl font-bold text-indigo-600 mb-4">Custom</div><button class="w-full px-6 py-3 bg-slate-100 text-slate-900 rounded-lg font-bold hover:scale-105 transition-transform">Contact Sales</button></div></div></div>', style: { backgroundColor: '#ffffff' } }
        ]
    },
    {
        id: '4',
        title: 'Bold Agency',
        category: 'Agency',
        focus: 'Design, Agency',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop',
        description: 'Dynamic layouts for modern digital agencies.',
        designer: 'Trend Lab',
        gridClass: 'md:col-span-2 md:row-span-1',
        elements: [
            { id: 'h1', type: 'hero', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-40"><div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-16"><div class="text-center lg:text-left"><h1 class="text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 italic">We build<br/>Future brands</h1><p class="text-xl text-slate-600 mb-8">Award-winning digital agency specialized in creative technology.</p><div class="flex flex-wrap gap-4 items-center justify-center lg:justify-start underline uppercase font-bold tracking-widest text-sm"><a href="#" class="hover:opacity-60">Services</a><span>/</span><a href="#" class="hover:opacity-60">Work</a><span>/</span><a href="#" class="hover:opacity-60">Contact</a></div></div><div class="aspect-square bg-gradient-to-br from-slate-200 to-slate-100 rounded-3xl"></div></div></div>', style: { backgroundColor: '#ffffff' } },
            { id: 'work', type: 'portfolio', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-20"><h2 class="text-6xl font-bold uppercase mb-16 tracking-tight">Recent Work</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div class="aspect-video bg-slate-900 rounded-2xl cursor-pointer hover:scale-102 transition-transform"></div><div class="aspect-video bg-slate-800 rounded-2xl cursor-pointer hover:scale-102 transition-transform"></div><div class="aspect-video bg-slate-700 rounded-2xl cursor-pointer hover:scale-102 transition-transform"></div><div class="aspect-video bg-slate-600 rounded-2xl cursor-pointer hover:scale-102 transition-transform"></div></div></div>', style: { backgroundColor: '#f8f8f8' } },
            { id: 'services', type: 'services', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-20 bg-slate-900 text-white rounded-3xl"><h2 class="text-5xl font-bold mb-16">Our Services</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-16"><div><h3 class="text-2xl font-bold mb-4">Strategy & Design</h3><p class="opacity-70 leading-relaxed">We craft digital experiences that drive business growth through thoughtful design and strategic planning.</p></div><div><h3 class="text-2xl font-bold mb-4">Development & Tech</h3><p class="opacity-70 leading-relaxed">Building powerful, scalable solutions with modern technology and best practices.</p></div></div></div>', style: { backgroundColor: 'transparent' } }
        ]
    },
    {
        id: '5',
        title: 'Journalist CV',
        category: 'Personal',
        focus: 'Writing, Professional',
        image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&auto=format&fit=crop',
        description: 'Elegant storytelling template for personal brands.',
        designer: 'Story Bits',
        gridClass: 'md:col-span-1 md:row-span-1',
        elements: [
            { id: 'h1', type: 'hero', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-24 border-b border-slate-200"><h2 class="text-sm font-bold uppercase tracking-[0.5em] mb-12">Author & Journalist</h2><h1 class="text-7xl font-serif italic mb-12">Samuel Penman.</h1><div class="max-w-xl"><p class="text-lg leading-relaxed text-slate-700">Writing at the intersection of culture, technology, and humanity. Contributing author to The New York times and Wired.</p></div></div>', style: { backgroundColor: '#f8f8f8' } },
            { id: 'articles', type: 'articles', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-20"><h2 class="text-4xl font-serif mb-12">Featured Articles</h2><div class="space-y-12"><article class="border-b border-slate-200 pb-12"><h3 class="text-2xl font-serif mb-3">The Future of Digital Culture</h3><p class="text-slate-600 mb-4">How emerging technologies are reshaping the way we consume and create content online.</p><div class="flex items-center justify-between"><span class="text-sm text-slate-500">Dec 2025</span><a href="#" class="text-indigo-600 font-bold">Read →</a></div></article><article class="border-b border-slate-200 pb-12"><h3 class="text-2xl font-serif mb-3">Interview: Building Tomorrow\'s Web</h3><p class="text-slate-600 mb-4">A conversation with industry leaders about the evolution of web development and design.</p><div class="flex items-center justify-between"><span class="text-sm text-slate-500">Nov 2025</span><a href="#" class="text-indigo-600 font-bold">Read →</a></div></article><article class="pb-12"><h3 class="text-2xl font-serif mb-3">The Art of Storytelling in Tech</h3><p class="text-slate-600 mb-4">Why narrative matters more than ever when explaining complex technical concepts.</p><div class="flex items-center justify-between"><span class="text-sm text-slate-500">Oct 2025</span><a href="#" class="text-indigo-600 font-bold">Read →</a></div></article></div></div>', style: { backgroundColor: '#ffffff' } },
            { id: 'about', type: 'about', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-20 bg-slate-900 text-white rounded-3xl"><div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"><div><h2 class="text-4xl font-serif mb-6">About Me</h2><p class="opacity-70 leading-relaxed mb-6">I\'ve been writing professionally for over a decade, covering technology, culture, and the intersection of both.</p><p class="opacity-70 leading-relaxed">My work has appeared in leading publications and has been recognized for thoughtful analysis and engaging storytelling.</p></div><div class="flex gap-8"><div><h3 class="font-bold text-2xl text-indigo-400">50+</h3><p class="text-sm opacity-60">Articles Published</p></div><div><h3 class="font-bold text-2xl text-indigo-400">2M+</h3><p class="text-sm opacity-60">Total Readers</p></div></div></div></div>', style: { backgroundColor: 'transparent' } }
        ]
    },
    {
        id: '6',
        title: 'Creative Pulse',
        category: 'Portfolio',
        focus: 'Art Direction, Bold',
        image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop',
        description: 'Vibrant and energetic layouts for designers.',
        designer: 'Web Builder Studio',
        gridClass: 'md:col-span-3 md:row-span-1',
        elements: [
            { id: 'h1', type: 'hero', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-32"><div class="w-20 h-20 bg-yellow-400 rounded-[2rem] mb-12 rotate-12 transition-transform hover:rotate-0"></div><h1 class="text-[120px] font-black uppercase tracking-tighter leading-none mb-12">Creative<br/><span class="text-indigo-600">Pulse.</span></h1><p class="text-2xl font-medium max-w-lg mb-12">Visual Designer & Art Director based in Berlin. Obsessed with high-contrast typography.</p><div class="flex gap-4"><button class="px-8 py-3 bg-slate-900 text-white rounded-lg font-bold hover:scale-105 transition-transform">View Work</button><button class="px-8 py-3 border-2 border-slate-900 rounded-lg font-bold hover:bg-slate-50 transition-colors">Get in Touch</button></div></div>', style: { backgroundColor: '#ffffff' } },
            { id: 'gallery', type: 'gallery', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-20"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="aspect-square bg-gradient-to-br from-yellow-300 to-indigo-600 rounded-3xl cursor-pointer hover:scale-102 transition-transform"></div><div class="aspect-square bg-gradient-to-br from-pink-400 to-purple-600 rounded-3xl cursor-pointer hover:scale-102 transition-transform"></div><div class="aspect-square bg-gradient-to-br from-blue-400 to-cyan-600 rounded-3xl cursor-pointer hover:scale-102 transition-transform"></div><div class="aspect-square bg-gradient-to-br from-orange-400 to-red-600 rounded-3xl cursor-pointer hover:scale-102 transition-transform"></div></div></div>', style: { backgroundColor: '#f5f5f5' } },
            { id: 'contact', type: 'contact', tag: 'section', innerHTML: '<div class="container mx-auto px-6 py-20 text-center"><h2 class="text-5xl font-black uppercase mb-6 tracking-tighter">Let\'s Create Together</h2><p class="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">I\'m always interested in hearing about new projects and creative opportunities.</p><div class="flex flex-col sm:flex-row gap-4 justify-center"><a href="mailto:hello@example.com" class="px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:scale-105 transition-transform">Email Me</a><a href="#" class="px-10 py-4 border-2 border-slate-900 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-colors">Dribbble</a><a href="#" class="px-10 py-4 border-2 border-slate-900 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-colors">Instagram</a></div></div>', style: { backgroundColor: '#f0f0f0' } }
        ]
    }
];
