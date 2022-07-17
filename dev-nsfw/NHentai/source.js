(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    async getTags() {
        // @ts-ignore
        return this.getSearchTags?.();
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    let time;
    let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],3:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":1,"./Tracker":2}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);

},{"./base":3,"./models":47}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],6:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],7:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],8:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],9:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],10:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],11:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],12:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],13:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],14:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],15:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],16:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],17:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],18:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],19:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],20:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],21:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],22:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],23:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":8,"./Form":9,"./FormRow":10,"./Header":11,"./InputField":12,"./Label":13,"./Link":14,"./MultilineLabel":15,"./NavigationButton":16,"./OAuthButton":17,"./Section":18,"./Select":19,"./Stepper":20,"./Switch":21,"./WebViewButton":22}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],27:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],28:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],29:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],30:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],31:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],32:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],33:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],34:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],35:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],36:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],37:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],41:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],44:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],45:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],46:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);
__exportStar(require("./SearchFilter"), exports);

},{"./Chapter":5,"./ChapterDetails":6,"./Constants":7,"./DynamicUI":23,"./HomeSection":24,"./Languages":25,"./Manga":26,"./MangaTile":27,"./MangaUpdate":28,"./PagedResults":29,"./RawData":30,"./RequestHeaders":31,"./RequestInterceptor":32,"./RequestManager":33,"./RequestObject":34,"./ResponseObject":35,"./SearchField":36,"./SearchFilter":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NHentai = exports.NHentaiInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const models_1 = require("./models");
const Settings_1 = require("./Settings");
const Utils_1 = require("./Utils");
exports.NHentaiInfo = {
    version: '1.0.0',
    name: 'nhentai',
    icon: 'icon.png',
    author: 'ItemCookie',
    authorWebsite: 'https://github.com/ItemCookie',
    description: 'Extension which pulls 18+ content from nhentai.',
    contentRating: paperback_extensions_common_1.ContentRating.ADULT,
    websiteBaseURL: models_1.Urls.api,
    language: paperback_extensions_common_1.LanguageCode.ENGLISH,
    sourceTags: [
        {
            text: '18+',
            type: paperback_extensions_common_1.TagType.YELLOW,
        },
        {
            text: 'Cloudflare',
            type: paperback_extensions_common_1.TagType.RED,
        },
    ],
};
// TODO(High): Create tests
// TODO(Low): Support multiple languages (AND operator) when searching & subtitletext
class NHentai extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.interceptor = {
            interceptRequest: async (request) => {
                request.headers = {
                    ...request.headers,
                    'user-agent': models_1.UserAgent,
                    referer: `${models_1.Urls.api}/`,
                };
                request.incognito = await (0, Settings_1.getIncognito)(this.stateManager);
                return request;
            },
            interceptResponse: async (response) => {
                return response;
            },
        };
        this.requestManager = createRequestManager({
            requestsPerSecond: 3,
            requestTimeout: 15000,
            interceptor: this.interceptor,
        });
        this.fallbackRequestManager = createRequestManager({
            requestsPerSecond: 1,
            requestTimeout: 15000,
            interceptor: this.interceptor,
        });
        this.stateManager = createSourceStateManager({});
    }
    async getSourceMenu() {
        return createSection({
            id: 'main',
            header: 'Source Settings',
            rows: async () => [(0, Settings_1.settings)(this.stateManager), (0, Settings_1.debugView)(this.stateManager), (0, Settings_1.resetSettings)(this.stateManager)],
        });
    }
    getMangaShareUrl(mangaId) {
        return `${models_1.Urls.api}/g/${mangaId}`;
    }
    async getSearchTags() {
        const sections = {};
        sections.sorting = createTagSection({
            id: 'sorting',
            label: 'Sort by (Select one)',
            tags: models_1.SortDefs.getSourceCodes(true).map((source) => createTag({ id: source, label: models_1.SortDefs.getName(source) })),
        });
        sections.language = createTagSection({
            id: 'language',
            label: 'Language (Select one)',
            tags: models_1.LangDefs.getSourceCodes(true).map((source) => createTag({ id: source, label: models_1.LangDefs.getLocalizedName(source) })),
        });
        return Object.values(sections);
    }
    async supportsSearchOperators() {
        return false;
    }
    async supportsTagExclusion() {
        return false;
    }
    async getMangaDetails(mangaId) {
        const data = await models_1.Requests.book(this.requestManager, mangaId);
        const parsed = this.checkErrors(data);
        return models_1.BookParser.manga(parsed);
    }
    async getChapters(mangaId) {
        const data = await models_1.Requests.book(this.requestManager, mangaId);
        const parsed = this.checkErrors(data);
        return [models_1.BookParser.chapter(parsed, mangaId)];
    }
    async getChapterDetails(mangaId) {
        const data = await models_1.Requests.book(this.requestManager, mangaId);
        const parsed = this.checkErrors(data);
        return models_1.BookParser.chapterDetails(parsed, mangaId);
    }
    async getSearchResults(query, metadata) {
        const ctx = await models_1.Search.createWithSettings(this.stateManager, query.title, {
            language: this.resolveLangauge(query.includedTags),
            sorting: this.resolveSorting(query.includedTags),
        });
        const results = await models_1.Search.search(ctx, this.getSearchOptions(), metadata);
        return createPagedResults({
            results: results.tiles ?? [],
            metadata: results.metadata,
        });
    }
    async getHomePageSections(sectionCallback) {
        const sections = [];
        for (const source of models_1.SortDefs.getSourceCodes(true)) {
            sections.push(createHomeSection({
                id: source,
                title: models_1.SortDefs.getName(source),
                view_more: true,
            }));
        }
        for (const section of sections) {
            const ctx = await models_1.Search.createWithSettings(this.stateManager, undefined, { sorting: section.id });
            const results = await models_1.Search.search(ctx, this.getSearchOptions(), {});
            section.items = results.tiles;
            sectionCallback(section);
        }
    }
    async getViewMoreItems(homepageSectionId, metadata) {
        const ctx = await models_1.Search.createWithSettings(this.stateManager, undefined, { sorting: homepageSectionId });
        const results = await models_1.Search.search(ctx, this.getSearchOptions(), metadata);
        return createPagedResults({
            results: results.tiles ?? [],
            metadata: results.metadata,
        });
    }
    getCloudflareBypassRequest() {
        return createRequestObject({
            url: models_1.Urls.cloudflare,
            method: 'GET',
            headers: {
                'user-agent': models_1.UserAgent,
                referer: `${models_1.Urls.cloudflare}/`,
            },
        });
    }
    getSearchOptions() {
        return {
            requests: this.requestManager,
            states: this.stateManager,
            fallback: this.fallbackRequestManager,
            cheerio: this.cheerio,
        };
    }
    checkErrors(data) {
        (0, Utils_1.checkCloudflare)(data.status);
        if (data.parsed == undefined) {
            throw new Error(`Error ${data.status}: ${data.data}`);
        }
        return data.parsed;
    }
    resolveLangauge(includedTags) {
        return includedTags?.find((tag) => models_1.LangDefs.data.map((def) => def.source).includes(tag.id))?.id;
    }
    resolveSorting(includedTags) {
        return includedTags?.find((tag) => models_1.SortDefs.data.map((def) => def.source).includes(tag.id))?.id;
    }
}
exports.NHentai = NHentai;

},{"./Settings":49,"./Utils":51,"./models":71,"paperback-extensions-common":4}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugView = exports.resetSettings = exports.settings = exports.reset = exports.getAlwaysFallback = exports.getIncognito = exports.getSearchSuffix = exports.getSorting = exports.getLanguage = exports.retrieveAs = void 0;
const models_1 = require("./models");
const SourceData_1 = require("./SourceData");
const Utils_1 = require("./Utils");
const retrieveAs = async (states, key) => (await states.retrieve(key));
exports.retrieveAs = retrieveAs;
const getLanguage = async (states) => {
    return (await (0, exports.retrieveAs)(states, 'language')) ?? models_1.LangDefs.getDefault();
};
exports.getLanguage = getLanguage;
const getSorting = async (states) => {
    return (await (0, exports.retrieveAs)(states, 'sorting')) ?? models_1.SortDefs.getDefault();
};
exports.getSorting = getSorting;
const getSearchSuffix = async (states) => {
    return (await (0, exports.retrieveAs)(states, 'search_suffix')) ?? '';
};
exports.getSearchSuffix = getSearchSuffix;
const getIncognito = async (states) => {
    return (await (0, exports.retrieveAs)(states, 'incognito')) ?? true;
};
exports.getIncognito = getIncognito;
const getAlwaysFallback = async (states) => {
    return (await (0, exports.retrieveAs)(states, 'always_fallback')) ?? false;
};
exports.getAlwaysFallback = getAlwaysFallback;
const reset = async (states) => {
    await Promise.all([
        states.store('language', null),
        states.store('sorting', null),
        states.store('search_suffix', null),
        states.store('incognito', null),
        states.store('always_fallback', null),
    ]);
};
exports.reset = reset;
const settings = (states) => createNavigationButton({
    id: 'settings',
    label: 'Settings',
    value: '',
    form: createForm({
        onSubmit: async (values) => {
            await Promise.all([
                states.store('language', values.language[0]),
                states.store('sorting', values.sorting[0]),
                states.store('search_suffix', (0, Utils_1.dumbify)(values.search_suffix)),
                states.store('incognito', values.incognito),
                states.store('always_fallback', values.always_fallback),
            ]);
        },
        validate: async () => true,
        sections: async () => [
            createSection({
                id: 'content',
                header: 'nhentai',
                footer: 'Modify the nhentai experience to your liking.',
                rows: async () => {
                    const values = await Promise.all([
                        (0, exports.getLanguage)(states),
                        (0, exports.getSorting)(states),
                        (0, exports.getSearchSuffix)(states),
                    ]);
                    return [
                        createSelect({
                            id: 'language',
                            label: 'Language',
                            options: models_1.LangDefs.getSourceCodes(true),
                            displayLabel: (option) => models_1.LangDefs.getLocalizedName(option),
                            value: [values[0]],
                            allowsMultiselect: false,
                            minimumOptionCount: 1,
                        }),
                        createSelect({
                            id: 'sorting',
                            label: 'Sort by',
                            options: models_1.SortDefs.getSourceCodes(true),
                            displayLabel: (option) => models_1.SortDefs.getName(option),
                            value: [values[1]],
                            allowsMultiselect: false,
                            minimumOptionCount: 1,
                        }),
                        createInputField({
                            id: 'search_suffix',
                            label: 'Additional arguments',
                            placeholder: '-yaoi -bbm -netorare -scat',
                            maskInput: false,
                            value: values[2],
                        }),
                    ];
                },
            }),
            createSection({
                id: 'web',
                header: 'Web Requests',
                footer: 'Always fallback is for debugging, and is limited to 1 request per second. (aka. Slow searching)',
                rows: async () => {
                    const values = await Promise.all([(0, exports.getIncognito)(states), (0, exports.getAlwaysFallback)(states)]);
                    return [
                        createSwitch({
                            id: 'incognito',
                            label: 'Incognito',
                            value: values[0],
                        }),
                        createSwitch({
                            id: 'always_fallback',
                            label: 'Always fallback',
                            value: values[1],
                        }),
                    ];
                },
            }),
        ],
    }),
});
exports.settings = settings;
const resetSettings = (states) => createButton({
    id: 'reset',
    label: 'Reset to Default',
    value: '',
    onTap: async () => await (0, exports.reset)(states),
});
exports.resetSettings = resetSettings;
// Debug
const debugView = (states) => createNavigationButton({
    id: 'debug',
    label: 'Debug',
    value: '',
    form: createForm({
        onSubmit: async () => undefined,
        validate: async () => true,
        sections: async () => [
            createSection({
                id: 'debug_settings',
                header: 'Stored Settings',
                rows: async () => {
                    const values = await Promise.all([
                        (0, exports.getLanguage)(states),
                        (0, exports.getSorting)(states),
                        (0, exports.getSearchSuffix)(states),
                        (0, exports.getIncognito)(states),
                        (0, exports.getAlwaysFallback)(states),
                    ]);
                    return [
                        createLabel({
                            id: 'debug_settings_language',
                            label: 'Language',
                            value: values[0],
                        }),
                        createLabel({
                            id: 'debug_settings_sorting',
                            label: 'Sort by',
                            value: values[1],
                        }),
                        createLabel({
                            id: 'debug_settings_search_suffix',
                            label: 'Search suffix',
                            value: values[2],
                        }),
                        createLabel({
                            id: 'debug_settings_incognito',
                            label: 'Incognito',
                            value: `${values[3] ? 'yes' : 'no'}`,
                        }),
                        createLabel({
                            id: 'debug_settings_always_fallback',
                            label: 'Always fallback',
                            value: `${values[4] ? 'yes' : 'no'}`,
                        }),
                    ];
                },
            }),
            createSection({
                id: 'debug_search',
                header: 'Searching',
                rows: async () => [
                    createNavigationButton({
                        id: 'debug_search_tests',
                        label: 'Search Tests',
                        value: '',
                        form: createForm({
                            onSubmit: async () => undefined,
                            validate: async () => true,
                            sections: async () => [
                                createSection({
                                    id: 'debug_search_tests_data',
                                    header: 'Output',
                                    rows: async () => {
                                        let count = 0;
                                        return await Promise.all(SourceData_1.Data.debug.search.map(async (q) => {
                                            const ctx = await models_1.Search.createWithSettings(states, q.input, {
                                                language: q.language,
                                                sorting: q.sort,
                                            });
                                            return createMultilineLabel({
                                                id: `debug_search_tests_data_${count++}`,
                                                label: `BookId: ${ctx.bookId ? 'yes' : 'no'}`,
                                                value: `Sort by: ${ctx.sorting}\nText: ${ctx.text}`,
                                            });
                                        }));
                                    },
                                }),
                            ],
                        }),
                    }),
                ],
            }),
            createSection({
                id: 'debug_pkg',
                header: 'Packaged Data',
                rows: async () => [
                    createMultilineLabel({
                        id: 'debug_pkg_ua',
                        label: 'User Agent Data',
                        value: models_1.UserAgent,
                    }),
                    createNavigationButton({
                        id: 'debug_pkg_url',
                        label: 'Url Data',
                        value: '',
                        form: createForm({
                            onSubmit: async () => undefined,
                            validate: async () => true,
                            sections: async () => [
                                createSection({
                                    id: 'debug_pkg_url_data',
                                    header: 'Definitions',
                                    rows: async () => Object.entries(SourceData_1.Data.nhentai.urls).map(([key, url]) => {
                                        return createMultilineLabel({
                                            id: `debug_pkg_url_data_${key}`,
                                            label: key,
                                            value: url,
                                        });
                                    }),
                                }),
                            ],
                        }),
                    }),
                    createNavigationButton({
                        id: 'debug_pkg_path',
                        label: 'Path Data',
                        value: '',
                        form: createForm({
                            onSubmit: async () => undefined,
                            validate: async () => true,
                            sections: async () => [
                                createSection({
                                    id: 'debug_pkg_path_data',
                                    header: 'Definitions',
                                    footer: "See 'Debug > Formatting' for formatted variants.",
                                    rows: async () => Object.entries(SourceData_1.Data.nhentai.paths).map(([key, path]) => {
                                        return createMultilineLabel({
                                            id: `debug_pkg_path_data_${key}`,
                                            label: key,
                                            value: `Base: ${path.url}\nPath: ${path.path}`,
                                        });
                                    }),
                                }),
                            ],
                        }),
                    }),
                    createNavigationButton({
                        id: 'debug_pkg_language',
                        label: 'Language Data',
                        value: '',
                        form: createForm({
                            onSubmit: async () => undefined,
                            validate: async () => true,
                            sections: async () => [
                                createSection({
                                    id: 'debug_pkg_language_data',
                                    header: 'Data',
                                    rows: async () => models_1.LangDefs.data.map((def) => {
                                        return createMultilineLabel({
                                            id: `debug_data_lang_def_${def.source}`,
                                            label: `${def.name}`,
                                            value: `Name: ${def.name}\nLocalized: ${def.localized}\nSource: ${def.source}\nInternal: ${def.internal}\nTagId: ${def.tag ?? 'None'}\nDefault: ${def.default ?? false}\nOrder: ${def.order ?? Infinity}`,
                                        });
                                    }),
                                }),
                            ],
                        }),
                    }),
                    createNavigationButton({
                        id: 'debug_pkg_sort',
                        label: 'Sorting Data',
                        value: '',
                        form: createForm({
                            onSubmit: async () => undefined,
                            validate: async () => true,
                            sections: async () => [
                                createSection({
                                    id: 'debug_pkg_sort_data',
                                    header: 'Data',
                                    rows: async () => models_1.SortDefs.data.map((def) => {
                                        return createMultilineLabel({
                                            id: `debug_pkg_sort_data_${def.source}`,
                                            label: def.name,
                                            value: `Name: ${def.name}\nSource: ${def.source}\nDefault: ${def.default ?? false}\nOrder: ${def.order ?? Infinity}`,
                                        });
                                    }),
                                }),
                            ],
                        }),
                    }),
                    createNavigationButton({
                        id: 'debug_pkg_debug',
                        label: 'Debug Data',
                        value: '',
                        form: createForm({
                            onSubmit: async () => undefined,
                            validate: async () => true,
                            sections: async () => [
                                createSection({
                                    id: 'debug_pkg_debug_data_search',
                                    header: 'Search Data',
                                    rows: async () => {
                                        let idx = 0;
                                        return SourceData_1.Data.debug.search.map((search) => {
                                            return createMultilineLabel({
                                                id: `debug_pkg_debug_data_search${idx++}`,
                                                label: `${idx}`,
                                                value: `Input: ${search.input}\nLanguage: ${search.language}\nSort: ${search.sort}`,
                                            });
                                        });
                                    },
                                }),
                                createSection({
                                    id: 'debug_pkg_debug_data_replace',
                                    header: 'Replacement Data',
                                    rows: async () => Object.entries(SourceData_1.Data.debug.replacements).map(([key, replace]) => {
                                        return createMultilineLabel({
                                            id: `debug_pkg_debug_data_replace_${key}`,
                                            label: key,
                                            value: replace,
                                        });
                                    }),
                                }),
                            ],
                        }),
                    }),
                ],
            }),
            createSection({
                id: 'debug_format',
                header: 'Formatting',
                rows: async () => [
                    createNavigationButton({
                        id: 'debug_format_path',
                        label: 'Formatted Path',
                        value: '',
                        form: createForm({
                            onSubmit: async () => undefined,
                            validate: async () => true,
                            sections: async () => [
                                createSection({
                                    id: 'debug_format_path_data',
                                    header: 'Definitions',
                                    rows: async () => Object.entries(SourceData_1.Data.nhentai.paths).map(([key, path]) => {
                                        return createMultilineLabel({
                                            id: `debug_format_path_data_${key}`,
                                            label: key,
                                            value: (0, Utils_1.format)(`${SourceData_1.Data.nhentai.urls[path.url] ??
                                                '_404_'}${path.path}`, SourceData_1.Data.debug.replacements),
                                        });
                                    }),
                                }),
                            ],
                        }),
                    }),
                ],
            }),
        ],
    }),
});
exports.debugView = debugView;

},{"./SourceData":50,"./Utils":51,"./models":71}],50:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const nhentaiData = __importStar(require("./data/nhentai.json"));
const debugData = __importStar(require("./data/debug.json"));
exports.Data = {
    nhentai: nhentaiData,
    debug: debugData,
};

},{"./data/debug.json":52,"./data/nhentai.json":53}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCloudflare = exports.dumbify = exports.LangLookup = exports.SimpleIsoMappings = exports.format = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const format = (source, replacements) => {
    return source.replace(/{(\w+)}/g, (placeholderWithDelimiters, placeholderWithoutDelimiters) => replacements[placeholderWithoutDelimiters] ?? placeholderWithDelimiters);
};
exports.format = format;
exports.SimpleIsoMappings = {
    _unknown: paperback_extensions_common_1.LanguageCode.UNKNOWN,
    en: paperback_extensions_common_1.LanguageCode.ENGLISH,
    ja: paperback_extensions_common_1.LanguageCode.JAPANESE,
    zh: paperback_extensions_common_1.LanguageCode.CHINEESE,
};
const LangLookup = (code) => {
    if (code == undefined) {
        return paperback_extensions_common_1.LanguageCode.UNKNOWN;
    }
    const lower = code.toLowerCase();
    return exports.SimpleIsoMappings[lower] ?? paperback_extensions_common_1.LanguageCode.UNKNOWN;
};
exports.LangLookup = LangLookup;
/**
 * iOS (& macOS?) does this magical thing called
 * smart punctuation, they cause errors &
 * users don't really expect it and don't check for it.
 * So we make sure to just replace them with
 * normal punctuation
 * @param smart Text that potentially contains smart quotes
 * @returns Text with smart quotes converted to normal quotes
 */
const dumbify = (smart) => {
    return smart.replace(/[“”‘’]/g, '"');
};
exports.dumbify = dumbify;
const checkCloudflare = (status) => {
    if (status == 503) {
        throw new Error("CLOUDFLARE BYPASS ERROR:\nPlease go to 'Settings > External Sources > nhentai' and press Cloudflare Bypass");
    }
};
exports.checkCloudflare = checkCloudflare;

},{"paperback-extensions-common":4}],52:[function(require,module,exports){
module.exports={
    "search": [
        { "input": "123" },
        { "input": "123", "sort": "date" },
        { "input": "123", "language": "japanese" },
        { "input": "123", "sort": "popular-week", "language": "chinese" },
        { "input": "test" },
        { "input": "test", "sort": "date" },
        { "input": "test", "language": "japanese" },
        { "input": "test", "sort": "popular-week", "language": "chinese" },
        { "input": "Smartquotes “”‘’" }
    ],
    "replacements": {
        "query": "+test",
        "encoded_query": "%2Btest",
        "extension": "png",
        "page": "10",
        "sort": "popular",
        "tagId": "123",
        "bookId": "1",
        "mediaId": "42"
    }
}

},{}],53:[function(require,module,exports){
module.exports={
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15",
    "urls": {
        "api": "https://nhentai.net",
        "thumbnails": "https://t.nhentai.net",
        "images": "https://i.nhentai.net",
        "cloudflare": "https://nhentai.net"
    },
    "paths": {
        "search": {
            "path": "/api/galleries/search?query={encoded_query}&page={page}",
            "url": "api"
        },
        "searchSorted": {
            "path": "/api/galleries/search?query={encoded_query}&page={page}&sort={sort}",
            "url": "api"
        },
        "searchFallback": {
            "path": "/search?q={encoded_query}&page={page}",
            "url": "api"
        },
        "searchSortedFallback": {
            "path": "/search?q={encoded_query}&page={page}&sort={sort}",
            "url": "api"
        },
        "gallery": {
            "path": "/api/gallery/{bookId}",
            "url": "api"
        },
        "galleryCover": {
            "path": "/galleries/{mediaId}/cover.{extension}",
            "url": "thumbnails"
        },
        "galleryPage": {
            "path": "/galleries/{mediaId}/{page}.{extension}",
            "url": "images"
        },
        "galleryPageThumbnail": {
            "path": "/galleries/{mediaId}/{page}t.{extension}",
            "url": "thumbnails"
        }
    },
    "languages": [
        {
            "name": "Include All",
            "localized": "Include All",
            "source": "_all",
            "internal": "_unknown",
            "order": 0
        },
        {
            "name": "English",
            "localized": "English",
            "source": "english",
            "internal": "en",
            "tag": 12227,
            "default": true,
            "order": 1
        },
        {
            "name": "Japanese",
            "localized": "日本語",
            "source": "japanese",
            "internal": "ja",
            "tag": 6346,
            "order": 2
        },
        {
            "name": "Chinese (Simplified)",
            "localized": "中文 (简化字)",
            "source": "chinese",
            "internal": "zh",
            "tag": 29963,
            "order": 3
        }
    ],
    "sorting": [
        {
            "name": "Popular all-time",
            "source": "popular",
            "default": true,
            "order": 1
        },
        {
            "name": "Popular this week",
            "source": "popular-week",
            "order": 2
        },
        {
            "name": "Popular today",
            "source": "popular-today",
            "order": 3
        },
        {
            "name": "Recent",
            "source": "date",
            "order": 0
        }
    ]
}

},{}],54:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookParser = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const BookTag_1 = require("./BookTag");
const Language_1 = require("./Language");
const Paths_1 = require("./Paths");
const getArtist = (book) => {
    for (const tag of book.tags) {
        if (tag.type === BookTag_1.BookTagType.Artist) {
            return tag.name;
        }
    }
    return 'Unknown';
};
// nhentai supports multiple languages.
// We prioritize the order defined in language definitions.
const getLanguage = (book) => {
    const languages = [];
    for (const tag of book.tags) {
        if (tag.type === BookTag_1.BookTagType.Language && tag.name !== 'translated') {
            languages.push(tag.name);
        }
    }
    return Language_1.LangDefs.getSourceCodes(true).find((source) => languages.includes(source)) ?? '';
};
exports.BookParser = {
    manga: (book) => {
        const tags = book.tags
            .filter((tag) => tag.type === BookTag_1.BookTagType.Tag)
            .map((tag) => createTag({ id: tag.id.toString(), label: tag.name }));
        const artist = getArtist(book);
        return createManga({
            id: book.bookId.toString(),
            titles: book.titles.priority,
            artist: artist,
            author: artist,
            image: Paths_1.Paths.galleryCover(book.mediaId, book.images.cover.type),
            status: paperback_extensions_common_1.MangaStatus.COMPLETED,
            follows: book.favorites,
            tags: [createTagSection({ id: 'tags', label: 'Tags', tags })],
            hentai: true,
        });
    },
    tiles: (books) => books.books.map((book) => exports.BookParser.tile(book)),
    tile: (book) => createMangaTile({
        id: book.bookId.toString(),
        image: Paths_1.Paths.galleryCover(book.mediaId, book.images.cover.type),
        subtitleText: createIconText({
            text: Language_1.LangDefs.getName(getLanguage(book)),
        }),
        title: createIconText({
            text: book.titles.pretty,
        }),
    }),
    tileFallback: (tile) => createMangaTile({
        id: tile.bookId,
        image: tile.thumbnail,
        subtitleText: createIconText({
            text: tile.language != undefined ? `${Language_1.LangDefs.getName(tile.language)}?` : 'Fallback',
        }),
        title: createIconText({
            text: tile.title,
        }),
    }),
    chapter: (book, mangaId) => createChapter({
        id: mangaId,
        mangaId: mangaId,
        chapNum: 1,
        name: book.titles.english,
        langCode: Language_1.LangDefs.getInternalCode(getLanguage(book)),
        time: new Date(book.uploaded),
    }),
    chapterDetails: (book, mangaId) => createChapterDetails({
        id: mangaId,
        mangaId: mangaId,
        longStrip: false,
        pages: book.images.pages.map((image, idx) => Paths_1.Paths.galleryPage(book.mediaId, idx + 1, image.type)),
    }),
};

},{"./BookTag":56,"./Language":62,"./Paths":64,"paperback-extensions-common":4}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookTagType = void 0;
var BookTagType;
(function (BookTagType) {
    BookTagType["Artist"] = "artist";
    BookTagType["Category"] = "category";
    BookTagType["Character"] = "character";
    BookTagType["Groups"] = "groups";
    BookTagType["Language"] = "language";
    BookTagType["Parody"] = "parody";
    BookTagType["Tag"] = "tag";
})(BookTagType = exports.BookTagType || (exports.BookTagType = {}));

},{}],57:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],58:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryParser = void 0;
const Language_1 = require("./Language");
const Image_1 = require("./Image");
const getType = (type) => {
    switch (type) {
        case 'j':
            return Image_1.ImageType.JPG;
        case 'p':
            return Image_1.ImageType.PNG;
        case 'g':
            return Image_1.ImageType.GIF;
    }
    throw new Error(`Unable to parse type '${type}'`);
};
exports.GalleryParser = {
    image: (image) => {
        return {
            type: getType(image.t),
            width: image.w,
            height: image.h,
        };
    },
    images: (images) => {
        return {
            cover: exports.GalleryParser.image(images.cover),
            thumbnail: exports.GalleryParser.image(images.thumbnail),
            pages: images.pages.map((page) => exports.GalleryParser.image(page)),
        };
    },
    titles: (titles) => {
        const priority = [titles.english, titles.japanese, titles.pretty].filter((title) => title != null);
        // tranformation:
        // - native? -> pretty? -> opposite? -> no title
        return {
            english: titles.english ?? titles.pretty ?? titles.japanese ?? '(no title)',
            japanese: titles.japanese ?? titles.pretty ?? titles.english ?? '(no title)',
            pretty: titles.pretty ?? titles.english ?? titles.japanese ?? '(no title)',
            priority: priority.length > 0 ? priority : ['(no title)'],
        };
    },
    tag: (tag) => {
        return {
            id: tag.id,
            type: tag.type,
            name: tag.name,
            used: tag.count,
        };
    },
    tiles: ($) => {
        const tiles = [];
        $('.gallery').each((idx, self) => {
            const link = $(self).find('a').attr('href');
            const bookId = /(\d+)/.exec(link ?? '')?.[0];
            const title = $(self).find('.caption').text();
            const thumbnail = $(self).find('img').attr('data-src');
            if (bookId == undefined || title == undefined || thumbnail == undefined) {
                console.log(`Unable to cheerio tile ${idx}: ${$(self).html()}`);
                return;
            }
            const tagIds = ($(self).attr('data-tags') ?? '').split(' ');
            tiles.push({
                bookId,
                title,
                thumbnail,
                language: tagIds.map((ids) => Language_1.LangDefs.getSourceFromTag(ids)).find((lang) => lang != undefined),
            });
        });
        return tiles;
    },
    book: (gallery) => {
        return {
            bookId: gallery.id,
            mediaId: gallery.media_id,
            titles: exports.GalleryParser.titles(gallery.title),
            images: exports.GalleryParser.images(gallery.images),
            scanlator: gallery.scanlator,
            tags: gallery.tags.map((tag) => exports.GalleryParser.tag(tag)),
            uploaded: gallery.upload_date * 1000,
            pages: gallery.num_pages,
            favorites: gallery.num_favorites,
        };
    },
    books: (galleries) => {
        return {
            books: galleries.result.map((gallery) => exports.GalleryParser.book(gallery)),
            pages: galleries.num_pages,
            per_page: galleries.per_page,
        };
    },
};

},{"./Image":60,"./Language":62}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageType = void 0;
var ImageType;
(function (ImageType) {
    ImageType["JPG"] = "jpg";
    ImageType["PNG"] = "png";
    ImageType["GIF"] = "gif";
})(ImageType = exports.ImageType || (exports.ImageType = {}));

},{}],61:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangDefs = exports.LanguageDefinitions = void 0;
const SourceData_1 = require("../SourceData");
const Utils_1 = require("../Utils");
class LanguageDefinitions {
    constructor(data) {
        this.data = data;
    }
    getSourceCodes(sort = false) {
        let language = this.data;
        if (sort) {
            language = [...language].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
        }
        return language.map((lang) => lang.source);
    }
    getName(source) {
        return this.data.find((lang) => lang.source == source)?.name ?? `Unknown '${source}'`;
    }
    getLocalizedName(source) {
        return this.data.find((lang) => lang.source == source)?.localized ?? `Unknown '${source}'`;
    }
    getInternalCode(source) {
        return (0, Utils_1.LangLookup)(this.data.find((lang) => lang.source == source)?.internal);
    }
    getTagId(source) {
        return this.data.find((lang) => lang.source == source)?.tag ?? -1;
    }
    getSourceFromTag(tagId) {
        return this.data.find((lang) => lang.tag == tagId)?.source;
    }
    getDefault() {
        return this.data.find((lang) => lang.default)?.source ?? 'english';
    }
}
exports.LanguageDefinitions = LanguageDefinitions;
exports.LangDefs = new LanguageDefinitions(SourceData_1.Data.nhentai.languages);

},{"../SourceData":50,"../Utils":51}],63:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paths = void 0;
const SourceData_1 = require("../SourceData");
const Utils_1 = require("../Utils");
const construct = (path, replacements) => {
    const url = SourceData_1.Data.nhentai.urls[path.url];
    if (url == undefined) {
        throw new Error(`Unable to construct path, unknown host '${path.url}'`);
    }
    return (0, Utils_1.format)(`${url}${path.path}`, replacements);
};
exports.Paths = {
    search: (query, page = 1, sort) => construct(sort == undefined ? SourceData_1.Data.nhentai.paths.search : SourceData_1.Data.nhentai.paths.searchSorted, {
        query: query,
        encoded_query: encodeURIComponent(query),
        page: page.toString(),
        sort: sort ?? '',
    }),
    searchFallback: (query, page = 1, sort) => construct(sort == undefined ? SourceData_1.Data.nhentai.paths.searchFallback : SourceData_1.Data.nhentai.paths.searchSortedFallback, {
        query: query,
        encoded_query: encodeURIComponent(query),
        page: page.toString(),
        sort: sort ?? '',
    }),
    gallery: (bookId) => construct(SourceData_1.Data.nhentai.paths.gallery, {
        bookId: bookId.toString(),
    }),
    galleryCover: (mediaId, extension) => construct(SourceData_1.Data.nhentai.paths.galleryCover, {
        mediaId: mediaId.toString(),
        extension: extension,
    }),
    galleryPage: (mediaId, page, extension) => construct(SourceData_1.Data.nhentai.paths.galleryPage, {
        mediaId: mediaId.toString(),
        page: page.toString(),
        extension: extension,
    }),
    galleryPageThumbnail: (mediaId, page, extension) => construct(SourceData_1.Data.nhentai.paths.galleryPageThumbnail, {
        mediaId: mediaId.toString(),
        page: page.toString(),
        extension: extension,
    }),
};

},{"../SourceData":50,"../Utils":51}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requests = void 0;
const GalleryParser_1 = require("./GalleryParser");
const Paths_1 = require("./Paths");
const isStatusSuccess = (status) => status <= 299 && status >= 200;
exports.Requests = {
    search: async (requests, query, page, sort) => {
        const request = createRequestObject({
            url: Paths_1.Paths.search(query, page, sort),
            method: 'GET',
        });
        const response = await requests.schedule(request, 1);
        if (isStatusSuccess(response.status)) {
            return {
                ...response,
                parsed: GalleryParser_1.GalleryParser.books(JSON.parse(response.data)),
            };
        }
        return response;
    },
    searchFallback: async (requests, cheerio, query, page, sort) => {
        const request = createRequestObject({
            url: Paths_1.Paths.searchFallback(query, page, sort),
            method: 'GET',
        });
        const response = await requests.schedule(request, 1);
        if (isStatusSuccess(response.status)) {
            return {
                ...response,
                parsed: GalleryParser_1.GalleryParser.tiles(cheerio.load(response.data)),
            };
        }
        return response;
    },
    book: async (requests, bookId) => {
        const request = createRequestObject({
            url: Paths_1.Paths.gallery(bookId),
            method: 'GET',
        });
        const response = await requests.schedule(request, 1);
        if (isStatusSuccess(response.status)) {
            return {
                ...response,
                parsed: GalleryParser_1.GalleryParser.book(JSON.parse(response.data)),
            };
        }
        return response;
    },
};

},{"./GalleryParser":59,"./Paths":64}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const Settings_1 = require("../Settings");
const Utils_1 = require("../Utils");
const BookParser_1 = require("./BookParser");
const Requests_1 = require("./Requests");
// The nhentai api is veery unstable when searching, and fails often
// so we scrape the site as a fallback when we get expected errors.
// As a last resort, the page will be outright skipped.
exports.Search = {
    search: async (ctx, options, metadata) => {
        let nextPage = metadata?.nextPage ?? 1;
        const maxPage = metadata?.maxPage ?? nextPage;
        const shouldStop = metadata?.shouldStop ?? nextPage > maxPage;
        if (shouldStop) {
            return {
                data: 'Was asked to stop',
                metadata: {
                    shouldStop: true,
                },
            };
        }
        if (ctx.bookId ?? false) {
            const data = await Requests_1.Requests.book(options.requests, ctx.text);
            (0, Utils_1.checkCloudflare)(data.status);
            if (data.parsed != undefined) {
                return {
                    tiles: [BookParser_1.BookParser.tile(data.parsed)],
                    data: data.data,
                    metadata: {
                        shouldStop: true,
                    },
                };
            }
            // fallthrough - It might not actually be a bookId?
        }
        while (nextPage <= maxPage) {
            // Api
            const fallbackOnly = options.states != undefined ? await (0, Settings_1.getAlwaysFallback)(options.states) : false;
            if (!fallbackOnly) {
                const data = await Requests_1.Requests.search(options.requests, ctx.text, nextPage, ctx.sorting);
                (0, Utils_1.checkCloudflare)(data.status);
                if (data.parsed != undefined) {
                    return {
                        tiles: BookParser_1.BookParser.tiles(data.parsed),
                        data: data.data,
                        metadata: {
                            nextPage: nextPage + 1,
                            maxPage: data.parsed.pages,
                            shouldStop: nextPage + 1 > data.parsed.pages,
                        },
                    };
                }
                if (data.status != 404) {
                    throw new Error(`Search Error ${data.status}: ${data.data}`);
                }
                console.log(`Unable to find page ${nextPage} using api, trying with fallback.`);
            }
            else {
                // This will be spammed, which is *fine* as this is only for debugging.
                console.log('[Warn] Always fallback is enabled');
            }
            if (options.cheerio == undefined) {
                if (fallbackOnly) {
                    throw new Error('Cheerio is required for always fallback.');
                }
                console.log(`Cheerio required for fallback is disabled, skipping page ${nextPage}`);
                nextPage++;
                continue;
            }
            // Fallback
            // Using the normal Request Manager can easily
            // go over the rate limit, and should ideally
            // never be used for fallback.
            const fdata = await Requests_1.Requests.searchFallback(options.fallback ?? options.requests, options.cheerio, ctx.text, nextPage, ctx.sorting);
            (0, Utils_1.checkCloudflare)(fdata.status);
            if (fdata.parsed != undefined) {
                return {
                    tiles: fdata.parsed.map((tile) => BookParser_1.BookParser.tileFallback(tile)),
                    data: fdata.data,
                    metadata: {
                        nextPage: nextPage + 1,
                        maxPage: metadata?.maxPage,
                        shouldStop: metadata?.maxPage ? nextPage + 1 > metadata.maxPage : undefined,
                    },
                };
            }
            // 429 happens when we reach the rate limit.
            if (fdata.status != 404 && fdata.status != 429) {
                throw new Error(`Search Error (fallback) ${fdata.status}: ${fdata.data}`);
            }
            // Try the next page.
            console.log(`Couldn't find page ${nextPage}, skipping to the next.`);
            nextPage++;
        }
        return {
            data: 'End of pages',
            metadata: { shouldStop: true },
        };
    },
    create: (text, options) => {
        if (text != undefined && /^\d+$/.test(text)) {
            return {
                text: text,
                bookId: true,
            };
        }
        const lang = options?.language ?? '_';
        const end = options?.suffix ?? '';
        const suffix = `${!lang.startsWith('_') ? `language:${lang}` : ''} ${end}`.trim();
        return {
            text: (0, Utils_1.dumbify)(text != undefined ? `${text} ${suffix}` : suffix),
            sorting: options?.sorting,
        };
    },
    createWithSettings: async (states, text, options) => {
        return exports.Search.create(text, {
            suffix: options?.suffix ?? (await (0, Settings_1.getSearchSuffix)(states)),
            language: options?.language ?? (await (0, Settings_1.getLanguage)(states)),
            sorting: options?.sorting ?? (await (0, Settings_1.getSorting)(states)),
        });
    },
};

},{"../Settings":49,"../Utils":51,"./BookParser":55,"./Requests":65}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortDefs = exports.SortingDefinitions = void 0;
const SourceData_1 = require("../SourceData");
class SortingDefinitions {
    constructor(data) {
        this.data = data;
    }
    getSourceCodes(sort = false) {
        let sorting = this.data;
        if (sort) {
            sorting = [...sorting].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
        }
        return sorting.map((sort) => sort.source);
    }
    getName(source) {
        return this.data.find((sort) => sort.source == source)?.name ?? `Unknown '${source}'`;
    }
    getDefault() {
        return this.data.find((sort) => sort.default)?.source ?? 'popular';
    }
}
exports.SortingDefinitions = SortingDefinitions;
exports.SortDefs = new SortingDefinitions(SourceData_1.Data.nhentai.sorting);

},{"../SourceData":50}],68:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Urls = void 0;
const SourceData_1 = require("../SourceData");
exports.Urls = SourceData_1.Data.nhentai.urls;

},{"../SourceData":50}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAgent = void 0;
const SourceData_1 = require("../SourceData");
exports.UserAgent = SourceData_1.Data.nhentai.user_agent;

},{"../SourceData":50}],71:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./nhentai"), exports);
__exportStar(require("./Book"), exports);
__exportStar(require("./BookParser"), exports);
__exportStar(require("./Books"), exports);
__exportStar(require("./BookTag"), exports);
__exportStar(require("./BookTitles"), exports);
__exportStar(require("./GalleryParser"), exports);
__exportStar(require("./Image"), exports);
__exportStar(require("./Images"), exports);
__exportStar(require("./Language"), exports);
__exportStar(require("./Parsed"), exports);
__exportStar(require("./Paths"), exports);
__exportStar(require("./Requests"), exports);
__exportStar(require("./Search"), exports);
__exportStar(require("./Sorting"), exports);
__exportStar(require("./Tile"), exports);
__exportStar(require("./Urls"), exports);
__exportStar(require("./UserAgent"), exports);

},{"./Book":54,"./BookParser":55,"./BookTag":56,"./BookTitles":57,"./Books":58,"./GalleryParser":59,"./Image":60,"./Images":61,"./Language":62,"./Parsed":63,"./Paths":64,"./Requests":65,"./Search":66,"./Sorting":67,"./Tile":68,"./Urls":69,"./UserAgent":70,"./nhentai":78}],72:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],73:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],74:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],75:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],76:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],77:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],78:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Galleries"), exports);
__exportStar(require("./Gallery"), exports);
__exportStar(require("./GalleryImage"), exports);
__exportStar(require("./GalleryImages"), exports);
__exportStar(require("./GalleryTag"), exports);
__exportStar(require("./GalleryTitles"), exports);

},{"./Galleries":72,"./Gallery":73,"./GalleryImage":74,"./GalleryImages":75,"./GalleryTag":76,"./GalleryTitles":77}]},{},[48])(48)
});
