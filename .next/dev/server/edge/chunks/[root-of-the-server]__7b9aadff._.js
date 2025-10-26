(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__7b9aadff._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/lib/i18n.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This is the list of supported locales
__turbopack_context__.s([
    "createLocalizedPathname",
    ()=>createLocalizedPathname,
    "defaultLocale",
    ()=>defaultLocale,
    "getLocaleFromPathname",
    ()=>getLocaleFromPathname,
    "isValidLocale",
    ()=>isValidLocale,
    "locales",
    ()=>locales
]);
const locales = [
    "en",
    "vi"
];
const defaultLocale = "en";
function isValidLocale(locale) {
    return locales.includes(locale);
}
function getLocaleFromPathname(pathname) {
    const segments = pathname.split("/");
    const locale = segments[1];
    if (isValidLocale(locale)) {
        return locale;
    }
    return defaultLocale;
}
function createLocalizedPathname(pathname, locale) {
    const segments = pathname.split("/");
    // Remove existing locale if present
    if (isValidLocale(segments[1])) {
        segments.splice(1, 1);
    }
    // Add new locale
    if (locale !== defaultLocale) {
        segments.splice(1, 0, locale);
    }
    return segments.join("/") || "/";
}
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n.ts [middleware-edge] (ecmascript)");
;
;
function middleware(request) {
    const pathname = request.nextUrl.pathname;
    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["locales"].every((locale)=>!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);
    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        // Get locale from Accept-Language header or use default
        const locale = getLocaleFromRequest(request) || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["defaultLocale"];
        // Redirect to the localized path
        const newUrl = new URL(`/${locale}${pathname}`, request.url);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(newUrl);
    }
}
function getLocaleFromRequest(request) {
    const acceptLanguage = request.headers.get("accept-language");
    if (!acceptLanguage) {
        return null;
    }
    // Parse Accept-Language header
    const languages = acceptLanguage.split(",").map((lang)=>{
        const [locale, qValue] = lang.trim().split(";q=");
        return {
            locale: locale.split("-")[0],
            quality: qValue ? parseFloat(qValue) : 1.0
        };
    }).sort((a, b)=>b.quality - a.quality);
    // Find the first supported locale
    for (const { locale } of languages){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isValidLocale"])(locale)) {
            return locale;
        }
    }
    return null;
}
const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next|api|favicon.ico|sw.js|manifest.json|manifest-vi.json|vite.svg).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__7b9aadff._.js.map