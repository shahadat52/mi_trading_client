import {
    Code2,
    Database,
    Globe2,
    Layers3,
    Mail,
    Server,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Wrench,
} from "lucide-react";
import { FaFacebook, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import img from '../../assets/developerimg.jpg'

const techStack = [
    {
        name: "React",
        description: "Frontend UI",
        icon: Code2,
    },
    {
        name: "TypeScript",
        description: "Type Safety",
        icon: ShieldCheck,
    },
    {
        name: "Tailwind CSS",
        description: "UI Styling",
        icon: Sparkles,
    },
    {
        name: "Redux Toolkit",
        description: "State Management",
        icon: Layers3,
    },
    {
        name: "Node.js",
        description: "Backend Runtime",
        icon: Server,
    },
    {
        name: "Express.js",
        description: "REST API",
        icon: Globe2,
    },
    {
        name: "MongoDB",
        description: "Database",
        icon: Database,
    },
    {
        name: "Mongoose",
        description: "ODM",
        icon: Wrench,
    },
];

const projectFeatures = [
    "Sales & Purchase Management",
    "Customer & Supplier Accounts",
    "Stock & Inventory Management",
    "Bank, Cash & MFS Management",
    "Receivable & Payable Tracking",
    "Invoice & Report Generation",
    "User Authentication & Authorization",
    "Business Analytics Dashboard",
];

const DevelopersPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 mb-6">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">



                {/* Developer + Project */}
                <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">

                    {/* Developer Card */}
                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <div className="mb-7">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                                Developer
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                Meet the developer
                            </h2>
                        </div>

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                            {/* Avatar */}
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-3xl font-bold text-white shadow-lg shadow-blue-500/20">
                                <img
                                    src={img}
                                    alt="Developer"
                                    className="
                                    h-24
                                    w-24
                                    shrink-0
                                    rounded-full
                                    object-cover
                                    ring-1
                                    ring-white/20
                                "
                                />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-slate-900">
                                    Shahadat Hossain
                                </h3>

                                <p className="text-sm font-medium text-blue-600">
                                    Full Stack Web Developer
                                </p>
                                <p className=" text-sm font-medium text-blue-600">
                                    01866168264
                                </p>

                                <p className="mt-3 text-justify max-w-md text-sm leading-6 text-slate-500">
                                    Focused on building scalable business applications,
                                    ERP systems and modern web solutions with clean
                                    architecture and intuitive user experiences.
                                </p>
                            </div>
                        </div>



                        {/* Skills */}
                        <div className="mt-6 flex flex-wrap gap-2">
                            {[
                                "React",
                                "TypeScript",
                                "Node.js",
                                "MongoDB",
                                "Redux",
                                "Tailwind CSS",
                            ].map((item) => (
                                <span
                                    key={item}
                                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        {/* Social */}
                        <div className="mt-7 flex gap-2 border-t border-slate-100 pt-6">
                            <a
                                href="https://github.com/shahadat52"
                                target="_blank"
                                aria-label="Github"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                            >
                                <FaGithub size={17} />
                            </a>

                            <a
                                href="https://wa.me/8801866168264"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-green-500 hover:bg-green-500 hover:text-white"
                            >
                                <FaWhatsapp size={17} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/shahadatdev"
                                target="_blank"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                            >
                                <FaLinkedinIn size={17} />
                            </a>

                            <a
                                href=" https://www.facebook.com/shahadat.hossain.561297/"
                                target="_blank"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                            >
                                <FaFacebook size={17} />
                            </a>


                            <a
                                href="mailto:shahadathossain.sh255@gmail.com"
                                target="_blank"
                                aria-label="Email"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                            >
                                <Mail size={17} />
                            </a>
                        </div>
                    </section>



                    {/* About Project */}
                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                            Project
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-slate-900">
                            About this ERP
                        </h2>

                        <p className="text-justify mt-4 text-sm leading-7 text-slate-500">
                            M.I Trading ERP provides a unified platform for managing
                            sales, purchases, inventory, customer accounts, supplier
                            accounts and financial transactions. The system is designed
                            to reduce repetitive work and provide business owners with
                            accurate and actionable information.
                        </p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {projectFeatures.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
                                >
                                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        <ShieldCheck size={14} />
                                    </div>

                                    <span className="text-sm font-medium leading-5 text-slate-700">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>


                {/* Hero */}
                <section className="mt-2 relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-white shadow-sm sm:px-10 lg:px-14 lg:py-14">
                    {/* Background Effects */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

                    <div className="relative z-10 max-w-3xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur">
                            <Code2 size={14} className="text-blue-400" />
                            Development & Technology
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            Built with precision.
                            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                Designed for business.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                            This ERP system has been designed and developed to simplify
                            day-to-day business operations, provide accurate financial
                            insights, and maintain centralized control over business data.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                <p className="text-xs text-slate-500">System</p>
                                <p className="mt-1 text-sm font-semibold">
                                    M.I Trading ERP
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                <p className="text-xs text-slate-500">Version</p>
                                <p className="mt-1 text-sm font-semibold">
                                    v1.0.0
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                <p className="text-xs text-slate-500">Status</p>

                                <div className="mt-1 flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                    <p className="text-sm font-semibold">
                                        Active
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Technology */}
                <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                                Technology
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                Technology stack
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-slate-500">
                            Modern technologies are used to provide performance,
                            maintainability and scalability.
                        </p>
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {techStack.map((tech) => {
                            const Icon = tech.icon;

                            return (
                                <div
                                    key={tech.name}
                                    className="group rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-blue-600 group-hover:text-white">
                                        <Icon size={19} />
                                    </div>

                                    <h3 className="mt-4 text-sm font-bold text-slate-900">
                                        {tech.name}
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        {tech.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Architecture */}
                <section className="mt-6 grid gap-4 md:grid-cols-3">
                    <InfoCard
                        icon={Smartphone}
                        title="Responsive"
                        description="Optimized for desktop, tablet and mobile devices."
                    />

                    <InfoCard
                        icon={Server}
                        title="REST Architecture"
                        description="Structured API architecture for reliable frontend-backend communication."
                    />

                    <InfoCard
                        icon={ShieldCheck}
                        title="Secure"
                        description="Authentication, authorization and protected business operations."
                    />
                </section>

                {/* Footer */}
                <footer className="mt-10 border-t border-slate-200 py-8 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Code2 size={16} className="text-blue-600" />

                        <span className="text-sm font-semibold text-slate-700">
                            M.I Trading ERP
                        </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                        Designed & Developed by Shahadat Hossain
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
};

type InfoCardProps = {
    icon: React.ElementType;
    title: string;
    description: string;
};

const InfoCard = ({
    icon: Icon,
    title,
    description,
}: InfoCardProps) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={18} />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
            </p>
        </div>
    );
};

export default DevelopersPage;