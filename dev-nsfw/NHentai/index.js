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

},{"./data/debug.json":53,"./data/nhentai.json":54}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combos = exports.yesno = exports.showFrozen = exports.stringifySearchContext = exports.stringifySearchEntry = exports.stringifySearchOptions = exports.stringifySorting = exports.stringifyLanguage = void 0;
const models_1 = require("./models");
const dedent = (str, preserveEmpty = false) => str.replace(preserveEmpty ? /\n[^\S\r\n]*/g : /\n\s*/g, '\n');
const stringifyLanguage = (language) => {
    // prettier-ignore
    return dedent(`
    Name: ${language.name}
    Short: ${language.short}
    Localized: ${language.localized}
    Source: ${language.source}
    TagId: ${language.tag ?? 'none'}
    Order: ${language.order ?? Infinity}
    Default: ${(0, exports.yesno)(language.default ?? false)}
    `.trim());
};
exports.stringifyLanguage = stringifyLanguage;
const stringifySorting = (sorting) => {
    // prettier-ignore
    return dedent(`
    Name: ${sorting.name}
    Source: ${sorting.source}
    Order: ${sorting.order ?? Infinity}
    Default: ${(0, exports.yesno)(sorting.default ?? false)}
    `.trim());
};
exports.stringifySorting = stringifySorting;
const stringifySearchOptions = (options) => {
    const langCtx = models_1.Search.createLanguageContext(options?.languages);
    const incl = langCtx.include;
    const excl = langCtx.exclude;
    // prettier-ignore
    return dedent(`
    Text: ${options?.text ?? '<none>'}
    Sort: ${options?.sort ?? '<none>'}
    Suffix: ${options?.suffix ?? '<none>'}
    Included Languages: [${incl.join(', ')}]
    Excluded Languages: [${excl.join(', ')}]
    `.trim());
};
exports.stringifySearchOptions = stringifySearchOptions;
const stringifySearchEntry = (entry) => {
    // prettier-ignore
    return dedent(`
    Text: ${entry.text}
    Sort: ${entry.sort ?? 'unknown'}
    Status: ${entry.status ?? 'unknown'}
    Skipped: ${(0, exports.yesno)(entry.skipped ?? false)}
    Stopped: ${(0, exports.yesno)(entry.stopped ?? false)}
    Should stop: ${(0, exports.yesno)(entry.shouldStop ?? false)}
    Reason: ${entry.reason ?? '<none>'}
    Fallback: ${(0, exports.yesno)(entry.fallback ?? false)}
    Next: ${entry.nextPage ?? 'unknown'}
    Max: ${entry.maxPage ?? 'unknown'}
    `.trim());
};
exports.stringifySearchEntry = stringifySearchEntry;
const stringifySearchContext = (context) => {
    // prettier-ignore
    return dedent(`
    Text: ${context.text}
    Sort: ${context.sort ?? '<omit>'}
    BookId: ${(0, exports.yesno)(context.bookId ?? false)}
    `.trim());
};
exports.stringifySearchContext = stringifySearchContext;
/**
 * Appends ' (frozen)' to the label if it's considered frozen.
 * @param label The label to use.
 * @param frozen Wether the state is frozen.
 * @returns The label appended by (frozen) if frozen.
 */
const showFrozen = (label, frozen) => `${label}${frozen ? ' (frozen)' : ''}`;
exports.showFrozen = showFrozen;
/**
 * Stringifies a boolean into a yes/no string.
 * @param bool The boolean to use.
 * @returns Yes or no depending on the bool.
 */
const yesno = (bool) => (bool ? 'yes' : 'no');
exports.yesno = yesno;
/**
 * Returns every unique array combination.
 * @param arr The array to create combinations of.
 * @param minLength The minimum length of a combination.
 * @returns An array of the combinations.
 */
const combos = (arr, minLength = 0) => {
    // Wtf even is this... but it works.
    // https://stackoverflow.com/a/42531964
    const combinations = new Array(1 << arr.length).fill(undefined).map((_, i) => arr.filter((_, j) => i & (1 << j)));
    return combinations.filter((a) => a.length >= minLength);
};
exports.combos = combos;

},{"./models":64}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NHentai = exports.NHentaiInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const models_1 = require("./models");
const Settings_1 = require("./Settings");
const ui_1 = require("./ui");
const Utils_1 = require("./Utils");
exports.NHentaiInfo = {
    version: '2.0.0',
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
// TODO(High): Figure out how to bypass Cloudflare during testing.
// TODO(Low): Refector UI stuff, as it's pretty terrible atm.
// TODO(Low): Update settings to allow changing languages to match search functionality.
// TODO(Low): Allow toggling homepage sections.
// TODO(Low): Do something about all those '// prettier-ignore' comments.
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
            rows: async () => {
                await (0, Settings_1.migrate)(this.stateManager);
                return [
                    (0, ui_1.settingsNavButton)(this.stateManager),
                    (0, ui_1.debugNavButton)(this.stateManager),
                    (0, Settings_1.resetSettings)(this.stateManager),
                ];
            },
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
            tags: models_1.SortDefs.getSources(true).map((source) => createTag({ id: source, label: models_1.SortDefs.getName(source) })),
        });
        sections.language = createTagSection({
            id: 'languages',
            label: 'Languages',
            tags: models_1.LangDefs.getSources(true).map((source) => createTag({ id: source, label: models_1.LangDefs.getLocalizedName(source) })),
        });
        sections.other = createTagSection({
            id: 'other',
            label: 'Other',
            tags: [
                createTag({ id: 'without_suffix', label: 'Without suffix' }),
                // Allows for pressing search without actually searching anything.
                createTag({ id: 'allow_empty', label: 'Allow empty search' }),
            ],
        });
        return Object.values(sections);
    }
    async supportsSearchOperators() {
        return false;
    }
    async supportsTagExclusion() {
        return true;
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
            languages: {
                include: this.resolveLangauges(query.includedTags),
                exclude: this.resolveLangauges(query.excludedTags),
            },
            sort: this.resolveSorting(query.includedTags),
            suffix: this.resolvesTag(query.includedTags, 'without_suffix') ? '' : undefined,
        });
        const searches = (await (0, Settings_1.getDoubleSearch)(this.stateManager)) ? 2 : 1;
        let tiles = [];
        for (let i = 0; i < searches; i++) {
            let results = undefined;
            try {
                results = await models_1.Search.search(ctx, this.getSearchObjects(), metadata);
            }
            finally {
                await (0, Settings_1.addSearchHistory)(this.stateManager, (0, Settings_1.createHistoryEntry)(ctx, results));
            }
            tiles = tiles.concat(results.tiles ?? []);
            metadata = results.metadata;
            if (metadata.shouldStop || (results.tiles ?? []).length <= 0) {
                break;
            }
        }
        return createPagedResults({
            results: tiles,
            metadata,
        });
    }
    async getHomePageSections(sectionCallback) {
        const sections = [];
        for (const source of models_1.SortDefs.getSources(true)) {
            sections.push(createHomeSection({
                id: source,
                title: models_1.SortDefs.getName(source),
                view_more: true,
            }));
        }
        for (const section of sections) {
            const ctx = await models_1.Search.createWithSettings(this.stateManager, undefined, { sort: section.id });
            const results = await models_1.Search.search(ctx, this.getSearchObjects(), {});
            section.items = results.tiles;
            sectionCallback(section);
        }
    }
    async getViewMoreItems(homepageSectionId, metadata) {
        const ctx = await models_1.Search.createWithSettings(this.stateManager, undefined, { sort: homepageSectionId });
        const results = await models_1.Search.search(ctx, this.getSearchObjects(), metadata);
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
    getSearchObjects() {
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
    resolveLangauges(tags) {
        return models_1.LangDefs.getFilteredSources(tags?.map((tag) => tag.id) ?? [], true);
    }
    resolveSorting(tags) {
        return models_1.SortDefs.getFilteredSources(tags?.map((tag) => tag.id) ?? [], true)[0];
    }
    resolvesTag(tags, id) {
        return tags?.find((tag) => tag.id === id) != undefined;
    }
}
exports.NHentai = NHentai;

},{"./Settings":51,"./Utils":52,"./models":64,"./ui":71,"paperback-extensions-common":4}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetSettings = exports.reset = exports.migrate = exports.getLatestSearch = exports.createHistoryEntry = exports.addSearchHistory = exports.setSearchHistory = exports.getSearchHistory = exports.setCollectSearches = exports.getCollectSearches = exports.setAlwaysFallback = exports.getAlwaysFallback = exports.setIncognito = exports.getIncognito = exports.setDoubleSearch = exports.getDoubleSearch = exports.setSearchSuffix = exports.getSearchSuffix = exports.setSorting = exports.getSorting = exports.setLanguage = exports.getLanguage = exports.retrieveAs = void 0;
const models_1 = require("./models");
const retrieveAs = async (states, key) => (await states.retrieve(key));
exports.retrieveAs = retrieveAs;
const getLanguage = async (states) => {
    const value = (await (0, exports.retrieveAs)(states, 'language')) ?? models_1.LangDefs.getDefault();
    if (value == null) {
        throw new Error('No default language found.');
    }
    return value;
};
exports.getLanguage = getLanguage;
const setLanguage = async (states, language) => {
    await states.store('language', models_1.LangDefs.findSource(language ?? undefined) ?? null);
};
exports.setLanguage = setLanguage;
const getSorting = async (states) => {
    const value = (await (0, exports.retrieveAs)(states, 'sorting')) ?? models_1.SortDefs.getDefault();
    if (value == null) {
        throw new Error('No default sorting found.');
    }
    return value;
};
exports.getSorting = getSorting;
const setSorting = async (states, sorting) => {
    await states.store('sorting', models_1.SortDefs.findSource(sorting ?? undefined) ?? null);
};
exports.setSorting = setSorting;
const getSearchSuffix = async (states) => {
    return (await (0, exports.retrieveAs)(states, 'search_suffix')) ?? '';
};
exports.getSearchSuffix = getSearchSuffix;
const setSearchSuffix = async (states, searchSuffix) => {
    await states.store('search_suffix', searchSuffix);
};
exports.setSearchSuffix = setSearchSuffix;
const getDoubleSearch = async (states) => {
    return (await (0, exports.retrieveAs)(states, 'double_search')) ?? false;
};
exports.getDoubleSearch = getDoubleSearch;
const setDoubleSearch = async (states, doubleSearch) => {
    await states.store('double_search', doubleSearch);
};
exports.setDoubleSearch = setDoubleSearch;
const getIncognito = async (states) => {
    return (await (0, exports.retrieveAs)(states, 'incognito')) ?? true;
};
exports.getIncognito = getIncognito;
const setIncognito = async (states, incognito) => {
    await states.store('incognito', incognito);
};
exports.setIncognito = setIncognito;
const getAlwaysFallback = async (states) => {
    return (await (0, exports.retrieveAs)(states, 'always_fallback')) ?? false;
};
exports.getAlwaysFallback = getAlwaysFallback;
const setAlwaysFallback = async (states, alwaysFallback) => {
    await states.store('always_fallback', alwaysFallback);
};
exports.setAlwaysFallback = setAlwaysFallback;
const getCollectSearches = async (states) => {
    return (await (0, exports.retrieveAs)(states, 'collect_searches')) ?? false;
};
exports.getCollectSearches = getCollectSearches;
const setCollectSearches = async (states, collectSearches) => {
    await states.store('collect_searches', collectSearches);
};
exports.setCollectSearches = setCollectSearches;
const getSearchHistory = async (states) => {
    return (await (0, exports.retrieveAs)(states, 'search_history')) ?? [];
};
exports.getSearchHistory = getSearchHistory;
const setSearchHistory = async (states, history) => {
    if (history == null) {
        await states.store('search_history', null);
        return;
    }
    if (!(await (0, exports.getCollectSearches)(states))) {
        return; // guard against collection
    }
    await states.store('search_history', history);
};
exports.setSearchHistory = setSearchHistory;
const addSearchHistory = async (states, results) => {
    if (!(await (0, exports.getCollectSearches)(states))) {
        return; // guard against collection
    }
    // history [newest, ..., oldest] with max length of 25
    const history = await (0, exports.getSearchHistory)(states);
    if (history.length >= 25) {
        history.pop();
    }
    history.splice(0, 0, results);
    await (0, exports.setSearchHistory)(states, history);
};
exports.addSearchHistory = addSearchHistory;
const createHistoryEntry = (context, results) => {
    return {
        text: typeof context === 'string' ? context : context.text,
        sort: typeof context !== 'string' ? context.sort : undefined,
        stopped: results?.tiles == undefined || results.tiles.length <= 0,
        status: results?.status,
        skipped: results?.skip,
        reason: results?.reason,
        fallback: results?.fallback,
        nextPage: results?.metadata.nextPage,
        maxPage: results?.metadata.maxPage,
        shouldStop: results?.metadata.shouldStop,
    };
};
exports.createHistoryEntry = createHistoryEntry;
const getLatestSearch = async (states) => {
    return (await (0, exports.getSearchHistory)(states))[0]?.text ?? '<none>';
};
exports.getLatestSearch = getLatestSearch;
const migrate = async (states) => {
    const values = await Promise.all([
        // Migrate from extensions-sources (nsfw)
        (0, exports.retrieveAs)(states, 'languages'),
        (0, exports.retrieveAs)(states, 'sort_order'),
        (0, exports.retrieveAs)(states, 'extra_args'),
        // Removed in v2
        (0, exports.retrieveAs)(states, 'latest_search'),
    ]);
    const updates = [];
    if (values[0] != null) {
        console.log(`Migrating old language [${values[0].join(', ')}]`);
        // prettier-ignore
        updates.push((0, exports.setLanguage)(states, models_1.LangDefs.getFilteredSources(values[0], true)[0] ?? null).then(() => states.store('languages', null)));
    }
    if (values[1] != null) {
        console.log(`Migrating old sorting [${values[1].join(', ')}]`);
        // prettier-ignore
        updates.push((0, exports.setSorting)(states, models_1.SortDefs.getFilteredSources(values[1], true)[0] ?? null).then(() => states.store('sort_order', null)));
    }
    if (values[2] != null) {
        console.log(`Migrating old search suffix '${values[2]}'`);
        // prettier-ignore
        updates.push((0, exports.setSearchSuffix)(states, values[2]).then(() => states.store('extra_args', null)));
    }
    if (values[3] != null) {
        console.log(`Migrating latest search (v2) '${values[3]}'`);
        // prettier-ignore
        updates.push((0, exports.setSearchHistory)(states, [{ text: values[3], reason: 'Migrated' }]).then(() => states.store('latest_search', null)));
    }
    if (updates.length > 0) {
        await Promise.all(updates);
        console.log(`Successfully migrated ${updates.length} setting(s)!`);
        return true;
    }
    return false;
};
exports.migrate = migrate;
const reset = async (states) => {
    await Promise.all([
        states.store('language', null),
        states.store('sorting', null),
        states.store('search_suffix', null),
        states.store('incognito', null),
        states.store('always_fallback', null),
        states.store('collect_searches', null),
        states.store('search_history', null),
        states.store('double_search', null),
    ]);
};
exports.reset = reset;
const resetSettings = (states) => createButton({
    id: 'reset',
    label: 'Reset to Default',
    value: '',
    onTap: async () => await (0, exports.reset)(states),
});
exports.resetSettings = resetSettings;

},{"./models":64}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCloudflare = exports.dumbify = exports.asArray = exports.orderedSortWith = exports.orderedSort = exports.format = void 0;
/**
 * A simple string formatter, which replaces named {curly_braces}
 * with the given replacements.
 * @param source The source string.
 * @param replacements The replacements to use.
 * @returns The formatted string.
 */
const format = (source, replacements) => {
    return source.replace(/{(\w+)}/g, (placeholderWithDelimiters, placeholderWithoutDelimiters) => replacements[placeholderWithoutDelimiters] ?? placeholderWithDelimiters);
};
exports.format = format;
/**
 * Sorts a copy of the array by {@link Ordered.order} and returns the result.
 * @param sortable An array of ordered objects.
 * @returns The sorted result.
 */
const orderedSort = (sortable) => {
    return [...sortable].sort((a, b) => (a?.order ?? Infinity) - (b?.order ?? Infinity));
};
exports.orderedSort = orderedSort;
/**
 * Sorts a copy of the array by the mapped order and returns the result.
 * @param sortable An array of objects that are to be ordered.
 * @param map The mapping to an order.
 * @returns The sorted result.
 */
const orderedSortWith = (sortable, map) => {
    const ordered = sortable.map((value, idx, arr) => {
        return {
            value: value,
            order: map(value, idx, arr),
        };
    });
    return (0, exports.orderedSort)(ordered).map((order) => order.value);
};
exports.orderedSortWith = orderedSortWith;
/**
 * Ensures that the value is an array.
 * @param value An element or array.
 * @returns An ensured array.
 */
const asArray = (value) => {
    if (value == undefined) {
        return [];
    }
    return Array.isArray(value) ? value : [value];
};
exports.asArray = asArray;
/**
 * iOS (& macOS?) does this magical thing called
 * smart punctuation, they cause errors &
 * users don't really expect it and don't check for it.
 * So we make sure to just replace them with
 * normal punctuation.
 * @param smart Text that potentially contains smart quotes.
 * @returns Text with smart quotes converted to normal quotes.
 */
const dumbify = (smart) => {
    return smart.replace(/[“”]/g, '"').replace(/‘’/g, "'");
};
exports.dumbify = dumbify;
/**
 * Checks wether we were stopped by Cloudflare.
 * And if so, give instructions to the user.
 * @param status The status code to check.
 */
const checkCloudflare = (status) => {
    if (status == 503) {
        throw new Error("CLOUDFLARE BYPASS ERROR:\nPlease go to 'Settings > External Sources > nhentai' and press Cloudflare Bypass");
    }
};
exports.checkCloudflare = checkCloudflare;

},{}],53:[function(require,module,exports){
module.exports={
    "search": [
        {},
        { "text": "test" },
        { "text": "123" },
        { "text": "#123" },
        { "text": " # 123 " }
    ],
    "replacements": {
        "query": "+test",
        "encoded_query": "%2Btest",
        "extension": "png",
        "page": "10",
        "sort": "popular",
        "book_id": "1",
        "media_id": "42"
    }
}

},{}],54:[function(require,module,exports){
module.exports={
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15",
    "empty_search": "pages:>0",
    "book_regex": "^\\s*#?\\s*(\\d+)\\s*$",
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
            "path": "/api/gallery/{book_id}",
            "url": "api"
        },
        "galleryCover": {
            "path": "/galleries/{media_id}/cover.{extension}",
            "url": "thumbnails"
        },
        "galleryPage": {
            "path": "/galleries/{media_id}/{page}.{extension}",
            "url": "images"
        }
    },
    "languages": [
        {
            "name": "Include all",
            "short": "??",
            "localized": "Include all",
            "source": "_all",
            "internal": "_unknown",
            "order": 0
        },
        {
            "name": "English",
            "short": "EN",
            "localized": "English",
            "source": "english",
            "internal": "gb",
            "tag": 12227,
            "default": true,
            "order": 1
        },
        {
            "name": "Japanese",
            "short": "JA",
            "localized": "日本語",
            "source": "japanese",
            "internal": "jp",
            "tag": 6346,
            "order": 2
        },
        {
            "name": "Chinese (Simplified)",
            "short": "ZH",
            "localized": "中文 (简化字)",
            "source": "chinese",
            "internal": "cn",
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

},{}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookParser = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const BookTypes_1 = require("./BookTypes");
const Languages_1 = require("./Languages");
const Urls_1 = require("./Urls");
const getArtist = (book) => {
    for (const tag of book.tags) {
        if (tag.type === BookTypes_1.BookTagType.Artist) {
            return tag.name;
        }
    }
    return 'Unknown';
};
// nhentai supports multiple languages.
// We prioritize the order defined in language definitions.
const getLanguages = (book) => {
    const languages = [];
    for (const tag of book.tags) {
        if (tag.type === BookTypes_1.BookTagType.Language && tag.name !== 'translated') {
            languages.push(tag.name);
        }
    }
    return Languages_1.LangDefs.getFilteredSources(languages, true);
};
exports.BookParser = {
    /**
     * Parses a {@link Book} into a {@link Manga} using {@link createManga}.
     * @param book The provided {@link Book}.
     * @returns The parsed manga.
     */
    manga: (book) => {
        const tags = book.tags
            .filter((tag) => tag.type === BookTypes_1.BookTagType.Tag)
            .map((tag) => createTag({ id: tag.id.toString(), label: tag.name }));
        const artist = getArtist(book);
        return createManga({
            id: book.bookId.toString(),
            titles: book.titles.priority,
            desc: `#${book.bookId}`,
            artist: artist,
            author: artist,
            image: Urls_1.Paths.galleryCover(book.mediaId, book.images.cover.type),
            status: paperback_extensions_common_1.MangaStatus.COMPLETED,
            follows: book.favorites,
            tags: [createTagSection({ id: 'tags', label: 'Tags', tags })],
            hentai: true,
        });
    },
    /**
     * Parses a {@link Book} into a {@link MangaTile} using {@link createMangaTile}.
     * @param book The provided {@link Book}.
     * @returns The parsed tile.
     */
    tile: (book) => createMangaTile({
        id: book.bookId.toString(),
        image: Urls_1.Paths.galleryCover(book.mediaId, book.images.cover.type),
        subtitleText: createIconText({
            text: Languages_1.LangDefs.getSubtitle(getLanguages(book)),
        }),
        title: createIconText({
            text: book.titles.pretty,
        }),
    }),
    /**
     * Parses a {@link Booklet} into a {@link MangaTile} using {@link createMangaTile}.
     * @param booklet The provided {@link Booklet}.
     * @returns The parsed tile.
     */
    tileFallback: (booklet) => createMangaTile({
        id: booklet.bookId,
        image: booklet.thumbnail,
        subtitleText: createIconText({
            text: booklet.languages.length > 0 ? `${Languages_1.LangDefs.getSubtitle(booklet.languages)}?` : 'Fallback',
        }),
        title: createIconText({
            text: booklet.title,
        }),
    }),
    /**
     * Parses a {@link Book} into a {@link Chapter} using {@link createChapter} with an optional {@link mangaId}.
     * @param book The provided {@link Book}.
     * @param mangaId The provided bookId.
     * @returns The parsed chapter.
     */
    chapter: (book, mangaId) => createChapter({
        id: mangaId ?? book.bookId.toString(),
        mangaId: mangaId ?? book.bookId.toString(),
        chapNum: 1,
        name: book.titles.english,
        langCode: Languages_1.LangDefs.getPriorityLangCode(getLanguages(book)),
        time: new Date(book.uploaded),
    }),
    /**
     * Parses a {@link Book} into {@link ChapterDetails} using {@link createChapterDetails} with an optional {@link mangaId}.
     * @param book The provided {@link Book}.
     * @param mangaId  The provided bookId.
     * @returns The parsed chapter details.
     */
    chapterDetails: (book, mangaId) => createChapterDetails({
        id: mangaId ?? book.bookId.toString(),
        mangaId: mangaId ?? book.bookId.toString(),
        longStrip: false,
        pages: book.images.pages.map((image, idx) => Urls_1.Paths.galleryPage(book.mediaId, idx + 1, image.type)),
    }),
};

},{"./BookTypes":56,"./Languages":59,"./Urls":63,"paperback-extensions-common":4}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookTagType = exports.ImageType = void 0;
var ImageType;
(function (ImageType) {
    ImageType["JPG"] = "jpg";
    ImageType["PNG"] = "png";
    ImageType["GIF"] = "gif";
})(ImageType = exports.ImageType || (exports.ImageType = {}));
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryParser = void 0;
const BookTypes_1 = require("./BookTypes");
const Languages_1 = require("./Languages");
const getType = (type) => {
    switch (type) {
        case 'j':
            return BookTypes_1.ImageType.JPG;
        case 'p':
            return BookTypes_1.ImageType.PNG;
        case 'g':
            return BookTypes_1.ImageType.GIF;
    }
    // Unreachable, but is there just in case.
    throw new Error(`Unable to parse image type '${type}'`);
};
exports.GalleryParser = {
    /**
     * Parses a {@link GalleryImage} into a {@link Image}.
     * @param image The provided {@link GalleryImage}.
     * @returns The parsed image.
     */
    image: (image) => {
        return {
            type: getType(image.t),
            width: image.w,
            height: image.h,
        };
    },
    /**
     * Parses {@link GalleryImages} into {@link Images}.
     * @param images The provided {@link GalleryImages}.
     * @returns The parsed images.
     */
    images: (images) => {
        return {
            cover: exports.GalleryParser.image(images.cover),
            thumbnail: exports.GalleryParser.image(images.thumbnail),
            pages: images.pages.map((page) => exports.GalleryParser.image(page)),
        };
    },
    /**
     * Parses {@link GalleryTitles} into {@link BookTitles}.
     * @param titles The provided {@link GalleryTitles}.
     * @returns The parsed titles.
     */
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
    /**
     * Parses a {@link GalleryTag} into a {@link BookTag}
     * @param tag The provided {@link GalleryTag}.
     * @returns The parsed tag.
     */
    tag: (tag) => {
        return {
            id: tag.id,
            type: tag.type,
            name: tag.name,
            used: tag.count,
        };
    },
    /**
     * Parses the loaded data into {@link Booklet Booklets}.
     * @param $ The loaded cheerio instance.
     * @returns The parsed booklets.
     */
    booklets: ($) => {
        const booklets = [];
        $('.gallery').each((idx, self) => {
            // $ a[href]
            const link = $(self).find('a').attr('href');
            const bookId = /(\d+)/.exec(link ?? '')?.[0];
            // $ .caption
            const title = $(self).find('.caption').text();
            // $ img[data-src]
            const thumbnail = $(self).find('img').attr('data-src');
            if (bookId == undefined || title == undefined || thumbnail == undefined) {
                console.log(`Unable to cheerio booklet ${idx}: ${$(self).html()}`);
                return;
            }
            // $ [data-tags]
            const tagIds = ($(self).attr('data-tags') ?? '').split(' ');
            booklets.push({
                bookId,
                title,
                thumbnail,
                languages: Languages_1.LangDefs.getSourcesFromTags(tagIds, true),
            });
        });
        return booklets;
    },
    /**
     * Parses a {@link Gallery} into a {@link Book}.
     * @param gallery The provided {@link Gallery}.
     * @returns The parsed book.
     */
    book: (gallery) => {
        return {
            bookId: gallery.id,
            mediaId: gallery.media_id,
            titles: exports.GalleryParser.titles(gallery.title),
            images: exports.GalleryParser.images(gallery.images),
            scanlator: gallery.scanlator,
            tags: gallery.tags.map((tag) => exports.GalleryParser.tag(tag)),
            // Tranform seconds into milliseconds.
            uploaded: gallery.upload_date * 1000,
            pages: gallery.num_pages,
            favorites: gallery.num_favorites,
        };
    },
    /**
     * Parses {@link Galleries} into {@link Books}.
     * @param galleries The provided {@link Galleries}.
     * @returns The parsed books.
     */
    books: (galleries) => {
        return {
            books: galleries.result.map((gallery) => exports.GalleryParser.book(gallery)),
            pages: galleries.num_pages,
            perPage: galleries.per_page,
        };
    },
};

},{"./BookTypes":56,"./Languages":59}],58:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangDefs = exports.LanguageDefinitions = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const Data_1 = require("../Data");
const Utils_1 = require("../Utils");
/**
 * A class for handling language definitions.
 */
class LanguageDefinitions {
    constructor(defs) {
        this.defs = [...defs];
        this.sorted = (0, Utils_1.orderedSort)(defs);
    }
    /**
     * Creates an array containing all sources.
     * @param sort Wether to sort the sources first.
     * @returns An array of all sources.
     */
    getSources(sort = false) {
        return (sort ? this.sorted : this.defs).map((lang) => lang.source);
    }
    /**
     * Tries to find the definition that the provided source belongs to.
     * @param source The source to search with.
     * @returns A copy of the language definition.
     */
    getDefinition(source) {
        const found = this.defs.find((lang) => lang.source === source);
        return found != undefined ? { ...found } : undefined;
    }
    /**
     * Tries to find the source using the provided source.
     * @param source The source to find.
     * @returns The source, if found in any definition.
     */
    findSource(source) {
        return this.getDefinition(source)?.source;
    }
    /**
     * Filters the provided sources with known sources.
     * @param sources The provided sources.
     * @param sort Wether to sort the sources first.
     * @param includeAll Wether to include sources starting with '_'
     * @returns A copy of provided sources filtered by all known sources.
     */
    getFilteredSources(sources, sort = false, includeAll = true) {
        const filtered = this.getSources(sort).filter((lang) => sources.includes(lang));
        return includeAll ? filtered : filtered.filter((lang) => !lang.startsWith('_'));
    }
    /**
     * Sorts the provided sources by their {@link Language.order}.
     * @param sources The provided sources.
     * @returns The sorted sources.
     */
    getSorted(sources) {
        return (0, Utils_1.orderedSortWith)(sources, this.getOrder.bind(this));
    }
    /**
     * Tries to find all sources using the provided tag ids.
     * @param tagIds The provided tag ids.
     * @param sort Wether to sort the sources first.
     * @returns An array of found sources.
     */
    getSourcesFromTags(tagIds, sort = false) {
        return (sort ? this.sorted : this.defs)
            .filter((def) => tagIds.map((tags) => tags.toString()).includes(def.tag?.toString() ?? '-1'))
            .map((def) => def.source);
    }
    /**
     * Tries to find the source using the provided tag id.
     * @param tagId The provided tag id.
     * @returns The source found by using the tag id.
     */
    getSourceFromTag(tagId) {
        return this.defs.find((lang) => lang.tag?.toString() === tagId)?.source;
    }
    /**
     * Finds the default source.
     * @returns The default source.
     */
    getDefault() {
        return this.defs.find((lang) => lang.default)?.source;
    }
    /**
     * Finds the source's name.
     * E.g. chinese = Chinese
     * @param source The source.
     * @returns The source's name.
     */
    // name -> Unknown '<source>'
    getName(source) {
        return this.getDefinition(source)?.name ?? `Unknown '${source}'`;
    }
    /**
     * Finds the source's short name.\
     * E.g. english = EN
     * @param source The source.
     * @returns The source's short name.
     */
    // short -> <source>[2,-2].upper()
    getShortName(source) {
        return this.getDefinition(source)?.short ?? source.substring(2, -2).toUpperCase();
    }
    /**
     * Finds the source's localized name.\
     * E.g. japanese = 日本語
     * @param source The source.
     * @returns The source's localized name.
     */
    // localized -> name...
    getLocalizedName(source) {
        return this.getDefinition(source)?.localized ?? this.getName(source);
    }
    /**
     * Finds the prioritized language code by using the source's order.
     * @param sources The provided sources.
     * @returns The prioritized language code by source order.
     */
    getPriorityLangCode(sources) {
        const sorted = this.getSorted(sources);
        return this.getLanguageCode(sorted[0] ?? '_all');
    }
    /**
     * Finds the source's language code.\
     * E.g. english = gb
     * @param source The source.
     * @returns The source's language code.
     */
    getLanguageCode(source) {
        // prettier-ignore
        return this.getDefinition(source)?.internal ?? paperback_extensions_common_1.LanguageCode.UNKNOWN;
    }
    /**
     * Finds the source's tag id.\
     * E.g. japanese = 6346
     * @param source The source.
     * @returns The source's tag id.
     */
    getTagId(source) {
        return this.getDefinition(source)?.tag ?? -1;
    }
    /**
     * Finds the source's display order.\
     * E.g. chinese = 3
     * @param source The source.
     * @returns The source's display order.
     */
    getOrder(source) {
        return this.getDefinition(source)?.order ?? Infinity;
    }
    /**
     * Combines the provided sources into a subtitle
     * displayed below covers when searching.
     * @param sources The provided sources.
     * @param sort Wether to sort the sources first.
     * @returns The source(s) combined into a subtitle.
     */
    getSubtitle(sources, sort = true) {
        const filtered = this.getFilteredSources(sources, sort);
        if (filtered.length <= 0) {
            return 'Unknown';
        }
        if (filtered.length === 1) {
            return this.getName(filtered[0] ?? 'Unknown');
        }
        return filtered.map((lang) => this.getShortName(lang)).join(', ');
    }
    /**
     * Emits a search string including or excluding all provided
     * sources, to combine include & exclude 2 strings should be
     * emitted and combined as `` `${include} ${exclude}`.trim()``
     * @param sources The provided sources.
     * @param exclude Wether the emited string is meant to exclude sources.
     * @returns A string including or excluding all provided sources.
     */
    emit(sources, exclude) {
        // If inclusive & Any string starting with '_'
        // is found, emit an empty string to include all.
        if (!exclude && sources.find((lang) => lang.startsWith('_')) != undefined) {
            return '';
        }
        // Emits all languages as either include or exclude.
        // (Include All is ignored for exclude, as excluding
        //  all doesn't make any sense)
        return this.getFilteredSources(sources, true, false)
            .map((lang) => `${exclude ? '-' : ''}language:${lang}`)
            .join(' ');
    }
}
exports.LanguageDefinitions = LanguageDefinitions;
exports.LangDefs = new LanguageDefinitions(Data_1.Data.nhentai.languages);

},{"../Data":48,"../Utils":52,"paperback-extensions-common":4}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requests = exports.UserAgent = void 0;
const Data_1 = require("../Data");
const GalleryParser_1 = require("./GalleryParser");
const Urls_1 = require("./Urls");
exports.UserAgent = Data_1.Data.nhentai.user_agent;
const isStatusSuccess = (status) => status >= 200 && status <= 299;
exports.Requests = {
    /**
     * Sends a search request using all provided parameters.
     * Returns a response with {@link Books} if successful.
     * @param requests The {@link RequestManager}.
     * @param query The search query.
     * @param page The search page.
     * @param sort The search sort.
     * @returns A parsed response with {@link Books}.
     */
    search: async (requests, query, page, sort) => {
        const request = createRequestObject({
            url: Urls_1.Paths.search(query, page, sort),
            method: 'GET',
        });
        // Destructing this doesn't seem to work correctly... for some reason.
        const response = await requests.schedule(request, 1);
        if (isStatusSuccess(response.status)) {
            return {
                data: response.data,
                status: response.status,
                parsed: GalleryParser_1.GalleryParser.books(JSON.parse(response.data)),
            };
        }
        return {
            data: response.data,
            status: response.status,
        };
    },
    /**
     * Sends a fallback ssearch request using all provided parameters, parsing using cheerio.
     * Returns a response with {@link Books} if successful.
     * @param requests The (fallback) {@link RequestManager}.
     * @param cheerio The {@link CheerioAPI Cheerio API}.
     * @param query The search query.
     * @param page  The search page.
     * @param sort The search sort.
     * @returns A parsed response with {@link Books}.
     */
    searchFallback: async (requests, cheerio, query, page, sort) => {
        const request = createRequestObject({
            url: Urls_1.Paths.searchFallback(query, page, sort),
            method: 'GET',
        });
        // Destructing this doesn't seem to work correctly... for some reason.
        const response = await requests.schedule(request, 1);
        if (isStatusSuccess(response.status)) {
            return {
                data: response.data,
                status: response.status,
                parsed: GalleryParser_1.GalleryParser.booklets(cheerio.load(response.data)),
            };
        }
        return {
            data: response.data,
            status: response.status,
        };
    },
    /**
     * Sends a gallery request using all provided parameters.
     * Returns a response with a {@link Book} if successful.
     * @param requests The request manager.
     * @param bookId The bookId.
     * @returns A parsed response with a {@link Book}.
     */
    book: async (requests, bookId) => {
        const request = createRequestObject({
            url: Urls_1.Paths.gallery(bookId),
            method: 'GET',
        });
        // Destructing this doesn't seem to work correctly... for some reason.
        const response = await requests.schedule(request, 1);
        if (isStatusSuccess(response.status)) {
            return {
                data: response.data,
                status: response.status,
                parsed: GalleryParser_1.GalleryParser.book(JSON.parse(response.data)),
            };
        }
        return {
            data: response.data,
            status: response.status,
        };
    },
};

},{"../Data":48,"./GalleryParser":57,"./Urls":63}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = exports.BookRegex = exports.EmptySearch = void 0;
const Data_1 = require("../Data");
const Settings_1 = require("../Settings");
const Utils_1 = require("../Utils");
const BookParser_1 = require("./BookParser");
const Languages_1 = require("./Languages");
const Requests_1 = require("./Requests");
const Sorting_1 = require("./Sorting");
/**
 * Empty queries results in an error, so we get
 * around this error by searching for
 * something all books has when empty.
 * (In this case 'pages:>0')
 */
exports.EmptySearch = Data_1.Data.nhentai.empty_search;
/**
 * The regex for matching book ids.\
 * The first ($1) group contains the id.
 */
exports.BookRegex = Data_1.Data.nhentai.book_regex;
// The nhentai api is veery unstable when searching, and fails often
// so we scrape the site as a fallback when we get expected errors.
// As a last resort, the page will be outright skipped.
exports.Search = {
    /**
     * Searches for books using provided context, objects & metadata with either the book id, API or fallback search.\
     * This method has extra capabilities. (E.g. page skipping, fallback) over the other search methods, and
     * is the preferred way to use {@link Search}.\
     * *This method first tries the book id then the API and if that fails tries the fallback search.*
     * @param ctx The search context.
     * @param objects The search objects.
     * @param metadata The persistant search metadata.
     * @returns The search results.
     */
    search: async (ctx, objects, metadata) => {
        let page = metadata?.nextPage ?? 1;
        // 3 pages. | page, page + 1, page + 2
        const softMax = page + 2;
        if (metadata?.shouldStop || page > (metadata?.maxPage ?? page)) {
            return {
                metadata: {
                    shouldStop: true,
                },
                reason: 'Should stop. (Combined)',
            };
        }
        // Search by book id.
        if (ctx.bookId) {
            return exports.Search.searchBookId(ctx, objects);
        }
        // Exit early if not a book id, but is parsed as such.
        if (new RegExp(exports.BookRegex).test(ctx.text)) {
            throw new Error(`Search doesn't support text searches that matches book ids. (${ctx.text})`);
        }
        const alwaysFallback = objects.states != undefined && (await (0, Settings_1.getAlwaysFallback)(objects.states));
        if (alwaysFallback) {
            // This will be spammed, which is *fine* as this is only for debugging.
            console.log('[Warn] Always fallback is enabled.');
        }
        while (page <= (metadata?.maxPage ?? softMax)) {
            if (!alwaysFallback) {
                // Search by API
                const byApi = await exports.Search.searchApi(ctx, objects, { ...metadata, nextPage: page }, true);
                if (!byApi.skip) {
                    return byApi;
                }
            }
            if (objects.cheerio != undefined) {
                if (!alwaysFallback) {
                    console.log(`Unable to find page ${page} using api, trying fallback.`);
                }
                // Search by Fallback
                const byFallback = await exports.Search.searchFallback(ctx, objects, { ...metadata, nextPage: page });
                if (!byFallback.skip) {
                    return byFallback;
                }
                console.log(`Couldn't find page ${page}, skipping to the next.`);
            }
            else {
                if (alwaysFallback) {
                    throw new Error('Cheerio is required for always fallback.');
                }
                console.log(`Cheerio required for fallback is disabled, skipping page ${page}`);
            }
            page++;
        }
        if (page > softMax) {
            // Should only happen if all endpoints returns 404,
            // else it would have thrown an error eariler.
            throw new Error('Search skipped 3 times, nhentai might be down.');
        }
        // Shouldn't ever reach here.
        return {
            metadata: {
                shouldStop: true,
            },
            reason: 'Skipped to end of pages. (Combined)',
        };
    },
    /**
     * Searches for books using provided context, objects & metadata with the API.\
     * *If {@link SearchMetadata.maxPage} is undefined, care should be taken for the next page.*
     * ***Prefer using {@link Search.search} instead***
     * @param ctx The search context.
     * @param objects The search objects.
     * @param metadata The persistant search metadata.
     * @returns The search results.
     */
    searchApi: async (ctx, objects, metadata, canFallback) => {
        if (ctx.bookId || new RegExp(exports.BookRegex).test(ctx.text)) {
            throw new Error(`Search doesn't support text searches that matches book ids. (${ctx.text})`);
        }
        const page = metadata?.nextPage ?? 1;
        if (metadata?.shouldStop || page > (metadata?.maxPage ?? page)) {
            return {
                metadata: {
                    shouldStop: true,
                },
                reason: 'Should stop.',
            };
        }
        const data = await Requests_1.Requests.search(objects.requests, ctx.text, page, ctx.sort);
        (0, Utils_1.checkCloudflare)(data.status);
        if (data.parsed != undefined) {
            const shouldStop = page + 1 > data.parsed.pages;
            return {
                tiles: data.parsed.books.map((book) => BookParser_1.BookParser.tile(book)),
                metadata: {
                    nextPage: page + 1,
                    maxPage: data.parsed.pages,
                    shouldStop,
                },
                status: data.status,
                reason: shouldStop ? 'End of pages.' : 'Search',
            };
        }
        // This can also just happen sometimes... for some reason. :D
        // Fallback search should be used in that case.
        // Search should skip if we shouldn't stop.
        if (data.status === 404) {
            const shouldStop = metadata?.maxPage != undefined ? page + 1 > metadata.maxPage : undefined;
            const shouldSkip = !shouldStop || canFallback;
            return {
                metadata: {
                    nextPage: page + 1,
                    maxPage: metadata?.maxPage,
                    shouldStop,
                },
                skip: shouldSkip,
                status: data.status,
                reason: shouldSkip ? 'Search skipped.' : 'Skipped to end of pages.',
            };
        }
        throw new Error(`Request Error ${data.status}: ${data.data}`);
    },
    /**
     * Searches for books using provided context, objects & metadata with the fallback search.\
     * *If {@link SearchMetadata.maxPage} is undefined, care should be taken for the next page.*
     * ***Prefer using {@link Search.search} instead***
     * @param ctx The search context.
     * @param objects The search objects.
     * @param metadata The persistant search metadata.
     * @returns The search results.
     */
    searchFallback: async (ctx, objects, metadata) => {
        if (ctx.bookId || new RegExp(exports.BookRegex).test(ctx.text)) {
            throw new Error(`Fallback doesn't support book id searches, as they usually respond with a book instead. (${ctx.text})`);
        }
        if (objects.cheerio == undefined) {
            throw new Error('A Cheerio object is required for fallback.');
        }
        const page = metadata?.nextPage ?? 1;
        const shouldStop = metadata?.maxPage != undefined ? page + 1 > metadata.maxPage : undefined;
        if (metadata?.shouldStop || page > (metadata?.maxPage ?? page)) {
            return {
                metadata: {
                    shouldStop: true,
                },
                reason: 'Should stop. (Fallback)',
                fallback: true,
            };
        }
        // Using the normal Request Manager can easily
        // go over the rate limit, and should ideally
        // never be used for fallback.
        const data = await Requests_1.Requests.searchFallback(objects.fallback ?? objects.requests, objects.cheerio, ctx.text, page, ctx.sort);
        (0, Utils_1.checkCloudflare)(data.status);
        if (data.parsed != undefined) {
            return {
                tiles: data.parsed.map((booklet) => BookParser_1.BookParser.tileFallback(booklet)),
                metadata: {
                    nextPage: page + 1,
                    maxPage: metadata?.maxPage,
                    shouldStop,
                },
                status: data.status,
                reason: shouldStop ? 'End of pages. (Fallback)' : 'Search (Fallback)',
                fallback: true,
            };
        }
        // 429 happens when we reach the rate limit.
        // 404 doesn't ever actually happen? It's there just in case.
        // Search should skip if we shouldn't stop.
        if (data.status === 429 || data.status === 404) {
            return {
                metadata: {
                    nextPage: page + 1,
                    maxPage: metadata?.maxPage,
                    shouldStop,
                },
                skip: !shouldStop,
                status: data.status,
                reason: shouldStop ? 'Skipped to end of pages. (Fallback)' : 'Search skipped. (Fallback)',
                fallback: true,
            };
        }
        throw new Error(`Request Error (Fallback) ${data.status}: ${data.data}`);
    },
    /**
     * Searches for the book's identifier.\
     * ***Prefer using {@link Search.search} instead***
     * @param ctx The search context.
     * @param objects The search objects.
     * @returns The search results.
     */
    searchBookId: async (ctx, objects) => {
        if (!ctx.bookId || !new RegExp(exports.BookRegex).test(ctx.text)) {
            throw new Error(`Searching by book id, but '${ctx.text}' is invalid.`);
        }
        const data = await Requests_1.Requests.book(objects.requests, ctx.text);
        (0, Utils_1.checkCloudflare)(data.status);
        if (data.parsed != undefined) {
            return {
                tiles: [BookParser_1.BookParser.tile(data.parsed)],
                metadata: {
                    shouldStop: true,
                },
                status: data.status,
                reason: 'Search by book id.',
            };
        }
        // nhentai search doesn't error for non-existant ids,
        // but instead returns 'no results', so we do the same.
        if (data.status === 404) {
            return {
                metadata: {
                    shouldStop: true,
                },
                status: data.status,
                reason: 'Book id not found.',
            };
        }
        throw new Error(`Request Error (BookId) ${data.status}: ${data.data}`);
    },
    /**
     * Creates a {@link SearchContext} from the provided parameters.
     * The context can be used in any of the search methods.
     * @param text The provided text.
     * @param options The provided options.
     * @returns The search context.
     */
    create: (text, options) => {
        const bookId = new RegExp(exports.BookRegex).exec(text ?? '');
        if (bookId != null) {
            if (bookId[1] == undefined) {
                // To make typescript happy.
                throw new Error(`Shouldn't happen, but it did. Context: ${bookId} is, but also isn't a bookId???`);
            }
            return {
                text: bookId[1],
                bookId: true,
            };
        }
        const langs = exports.Search.emitLanguages(options?.languages);
        const suffix = options?.suffix ?? '';
        const sort = Sorting_1.SortDefs.findSource(options?.sort);
        const extras = `${langs} ${suffix}`.trim();
        const query = text != undefined ? `${text} ${extras}` : extras;
        return {
            text: query.trim() || options?.empty || exports.EmptySearch,
            sort,
        };
    },
    /**
     * Creates a {@link SearchContext} from the provided parameters & defaults
     * provided from the source's state maager. The context can be used in
     * any of the search methods.
     * @param states The source's state manager.
     * @param text The provided text.
     * @param options The provided options.
     * @returns The search context with defaults applied.
     */
    createWithSettings: async (states, text, options) => {
        if (states == undefined) {
            return exports.Search.create(text, options);
        }
        let langCtx = exports.Search.createLanguageContext(options?.languages);
        if (langCtx.empty) {
            langCtx = exports.Search.createLanguageContext(await (0, Settings_1.getLanguage)(states));
        }
        return exports.Search.create(text, {
            suffix: options?.suffix ?? (await (0, Settings_1.getSearchSuffix)(states)),
            languages: langCtx,
            sort: options?.sort ?? (await (0, Settings_1.getSorting)(states)),
            empty: options?.empty,
        });
    },
    /**
     * Parses the languages property of the {@link SearchOptions} object
     * into a {@link LanguageContext}.
     * @param options The provided language options.
     * @returns The parsed language options, to a more strict object.
     */
    createLanguageContext: (options) => {
        if (options == undefined) {
            return { include: [], exclude: [], empty: true };
        }
        if (typeof options === 'string') {
            const lang = Languages_1.LangDefs.findSource(options);
            return { include: (0, Utils_1.asArray)(lang), exclude: [], empty: lang == undefined };
        }
        if (Array.isArray(options)) {
            const filtered = Languages_1.LangDefs.getFilteredSources(options, true);
            return { include: filtered, exclude: [], empty: filtered.length <= 0 };
        }
        const include = Languages_1.LangDefs.getFilteredSources((0, Utils_1.asArray)(options.include), true);
        const exclude = Languages_1.LangDefs.getFilteredSources((0, Utils_1.asArray)(options.exclude), true, false);
        return {
            include,
            exclude: exclude.filter((excl) => !include.includes(excl)),
            empty: include.length <= 0 && exclude.length <= 0,
        };
    },
    /**
     * Uses {@link LangDefs.emit} to build a string containing both
     * include & exclude to be used in search.
     * @param options The provided language options.
     * @returns The emitted string, based on the provided options.
     */
    emitLanguages: (options) => {
        const langCtx = exports.Search.createLanguageContext(options);
        const includedLangs = Languages_1.LangDefs.emit(langCtx.include, false);
        const excludedLangs = Languages_1.LangDefs.emit(langCtx.exclude, true);
        return `${includedLangs} ${excludedLangs}`.trim();
    },
    /**
     * Uses {@link LangDefs.emit} to build a string containing both
     * include & exclude to be used in search.
     * If the provided options are considered empty, use languages
     * provided by in-app settings instead.
     * @param options The provided language options.
     * @param states The source's state manager.
     * @returns The emitted string.
     */
    emitLanguagesWithSettings: async (options, states) => {
        let langCtx = exports.Search.createLanguageContext(options);
        if (langCtx.empty && states != undefined) {
            langCtx = exports.Search.createLanguageContext(await (0, Settings_1.getLanguage)(states));
        }
        return exports.Search.emitLanguages(langCtx);
    },
};

},{"../Data":48,"../Settings":51,"../Utils":52,"./BookParser":55,"./Languages":59,"./Requests":60,"./Sorting":62}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortDefs = exports.SortingDefinitions = void 0;
const Data_1 = require("../Data");
const Utils_1 = require("../Utils");
/**
 * A class for handling sorting definitions.
 */
class SortingDefinitions {
    constructor(defs) {
        this.defs = [...defs];
        this.sorted = (0, Utils_1.orderedSort)(defs);
    }
    /**
     * Creates an array containing all sources.
     * @param sort Wether to sort the sources first.
     * @returns An array of all sources.
     */
    getSources(sort = false) {
        return (sort ? this.sorted : this.defs).map((lang) => lang.source);
    }
    /**
     * Tries to find the definition that the provided source belongs to.
     * @param source The source to search with.
     * @returns A copy of the sorting definition.
     */
    getDefinition(source) {
        const found = this.defs.find((lang) => lang.source === source);
        return found != undefined ? { ...found } : undefined;
    }
    /**
     * Tries to find the source using the provided source.
     * @param source The source to find.
     * @returns The source, if found in any definition.
     */
    findSource(source) {
        return this.getDefinition(source)?.source;
    }
    /**
     * Filters the provided sources with known sources.
     * @param sources The provided sources.
     * @param sort Wether to sort the sources first.
     * @returns A copy of provided sources filtered by all known sources.
     */
    getFilteredSources(sources, sort = false) {
        return this.getSources(sort).filter((lang) => sources.includes(lang));
    }
    /**
     * Sorts the provided sources by their {@link Sorting.order}.
     * @param sources The provided sources.
     * @returns The sorted sources.
     */
    getSorted(sources) {
        return (0, Utils_1.orderedSortWith)(sources, this.getOrder);
    }
    /**
     * Finds the default source.
     * @returns The default source.
     */
    getDefault() {
        return this.defs.find((lang) => lang.default)?.source;
    }
    /**
     * Finds the source's name.
     * E.g. date = Recent
     * @param source The source.
     * @returns The source's name.
     */
    // name -> Unknown '<source>'
    getName(source) {
        return this.getDefinition(source)?.name ?? `Unknown '${source}'`;
    }
    /**
     * Finds the source's display order.\
     * E.g. popular = 1
     * @param source The source.
     * @returns The source's display order.
     */
    getOrder(source) {
        return this.getDefinition(source)?.order ?? Infinity;
    }
}
exports.SortingDefinitions = SortingDefinitions;
exports.SortDefs = new SortingDefinitions(Data_1.Data.nhentai.sorting);

},{"../Data":48,"../Utils":52}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paths = exports.Urls = void 0;
const Data_1 = require("../Data");
const Utils_1 = require("../Utils");
exports.Urls = Data_1.Data.nhentai.urls;
const construct = (path, replacements) => {
    const url = exports.Urls[path.url];
    if (url == undefined) {
        throw new Error(`Unable to construct path, unknown host '${path.url}'`);
    }
    return (0, Utils_1.format)(`${url}${path.path}`, replacements);
};
exports.Paths = {
    /**
     * Search by query endpoint.
     * @param query The search query.
     * @param page The page.
     * @param sort The sorting mode.
     * @returns The url endpoint.
     */
    search: (query, page = 1, sort) => construct(sort == undefined ? Data_1.Data.nhentai.paths.search : Data_1.Data.nhentai.paths.searchSorted, {
        query: query,
        encoded_query: encodeURIComponent(query),
        page: page.toString(),
        sort: sort ?? '',
    }),
    /**
     * Search by query endpoint. (fallback)
     * @param query The search query.
     * @param page The page.
     * @param sort The sorting mode.
     * @returns The url endpoint.
     */
    searchFallback: (query, page = 1, sort) => construct(sort == undefined ? Data_1.Data.nhentai.paths.searchFallback : Data_1.Data.nhentai.paths.searchSortedFallback, {
        query: query,
        encoded_query: encodeURIComponent(query),
        page: page.toString(),
        sort: sort ?? '',
    }),
    /**
     * Gallery content endpoint.
     * @param bookId The bookId.
     * @returns The url endpoint.
     */
    gallery: (bookId) => construct(Data_1.Data.nhentai.paths.gallery, {
        book_id: bookId.toString(),
    }),
    /**
     * Gallery's cover image endpoint.
     * @param mediaId The mediaId. (This is different from bookId)
     * @param extension Image extension
     * @returns The url endpoint.
     */
    galleryCover: (mediaId, extension) => construct(Data_1.Data.nhentai.paths.galleryCover, {
        media_id: mediaId.toString(),
        extension: extension,
    }),
    /**
     * Gallery's page image endpoint.
     * @param mediaId The mediaId. (This is different from bookId)
     * @param page The page.
     * @param extension The image extension.
     * @returns The url endpoint.
     */
    galleryPage: (mediaId, page, extension) => construct(Data_1.Data.nhentai.paths.galleryPage, {
        media_id: mediaId.toString(),
        page: page.toString(),
        extension: extension,
    }),
};

},{"../Data":48,"../Utils":52}],64:[function(require,module,exports){
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
// Types
__exportStar(require("./GalleryTypes"), exports);
__exportStar(require("./BookTypes"), exports);
// Parsers
__exportStar(require("./GalleryParser"), exports);
__exportStar(require("./BookParser"), exports);
// Definitions
__exportStar(require("./Languages"), exports);
__exportStar(require("./Sorting"), exports);
__exportStar(require("./Urls"), exports);
// Requesting
__exportStar(require("./Requests"), exports);
__exportStar(require("./Search"), exports);

},{"./BookParser":55,"./BookTypes":56,"./GalleryParser":57,"./GalleryTypes":58,"./Languages":59,"./Requests":60,"./Search":61,"./Sorting":62,"./Urls":63}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packagedDebugReplaceSection = exports.packagedDebugSearchSection = exports.packagedSortingSection = exports.packagedLanguageSection = exports.packagedPathSection = exports.packagedUrlSection = exports.packagedDebugNavButton = exports.packagedSortingNavButton = exports.packagedLanguageNavButton = exports.packagedPathNavButton = exports.packagedUrlNavButton = exports.packagedDataSection = void 0;
const Data_1 = require("../Data");
const Debug_1 = require("../Debug");
const models_1 = require("../models");
const DebugUI_1 = require("./DebugUI");
const packagedDataSection = () => createSection({
    id: 'debug_pkg',
    header: 'Packaged Data',
    rows: async () => [
        createMultilineLabel({
            id: 'debug_pkg_ua',
            label: 'User Agent Data',
            value: models_1.UserAgent,
        }),
        createMultilineLabel({
            id: 'debug_pkg_empty_search',
            label: 'Empty Search',
            value: models_1.EmptySearch,
        }),
        (0, exports.packagedUrlNavButton)(),
        (0, exports.packagedPathNavButton)(),
        (0, exports.packagedLanguageNavButton)(),
        (0, exports.packagedSortingNavButton)(),
        (0, exports.packagedDebugNavButton)(),
    ],
});
exports.packagedDataSection = packagedDataSection;
const packagedUrlNavButton = () => (0, DebugUI_1.createNavSections)({
    id: 'debug_pkg_url',
    label: 'Url Data',
    sections: async () => [(0, exports.packagedUrlSection)()],
});
exports.packagedUrlNavButton = packagedUrlNavButton;
const packagedPathNavButton = () => (0, DebugUI_1.createNavSections)({
    id: 'debug_pkg_path',
    label: 'Path Data',
    sections: async () => [(0, exports.packagedPathSection)()],
});
exports.packagedPathNavButton = packagedPathNavButton;
const packagedLanguageNavButton = () => (0, DebugUI_1.createNavSections)({
    id: 'debug_pkg_language',
    label: 'Language Data',
    sections: async () => [(0, exports.packagedLanguageSection)()],
});
exports.packagedLanguageNavButton = packagedLanguageNavButton;
const packagedSortingNavButton = () => (0, DebugUI_1.createNavSections)({
    id: 'debug_pkg_sort',
    label: 'Sorting Data',
    sections: async () => [(0, exports.packagedSortingSection)()],
});
exports.packagedSortingNavButton = packagedSortingNavButton;
const packagedDebugNavButton = () => (0, DebugUI_1.createNavSections)({
    id: 'debug_pkg_debug',
    label: 'Debug Data',
    sections: async () => [
        // prettier-ignore
        (0, exports.packagedDebugSearchSection)(),
        (0, exports.packagedDebugReplaceSection)(),
    ],
});
exports.packagedDebugNavButton = packagedDebugNavButton;
const packagedUrlSection = () => createSection({
    id: 'debug_pkg_url_data',
    header: 'Definitions',
    rows: async () => Object.entries(Data_1.Data.nhentai.urls).map(([key, url]) => {
        return createMultilineLabel({
            id: `debug_pkg_url_data[${key}]`,
            label: key,
            value: url,
        });
    }),
});
exports.packagedUrlSection = packagedUrlSection;
const packagedPathSection = () => createSection({
    id: 'debug_pkg_path_data',
    header: 'Definitions',
    footer: "See 'Debug > Formatting' for formatted variants.",
    rows: async () => Object.entries(Data_1.Data.nhentai.paths).map(([key, path]) => {
        return createMultilineLabel({
            id: `debug_pkg_path_data[${key}]`,
            label: key,
            value: `Url: ${path.url}\nPath: ${path.path}`,
        });
    }),
});
exports.packagedPathSection = packagedPathSection;
const packagedLanguageSection = () => createSection({
    id: 'debug_pkg_language_data',
    header: 'Definitions',
    rows: async () => models_1.LangDefs.defs.map((def) => {
        return createMultilineLabel({
            id: `debug_pkg_language_data[${def.source}]`,
            label: def.name,
            value: (0, Debug_1.stringifyLanguage)(def),
        });
    }),
});
exports.packagedLanguageSection = packagedLanguageSection;
const packagedSortingSection = () => createSection({
    id: 'debug_pkg_sort_data',
    header: 'Definitions',
    rows: async () => models_1.SortDefs.defs.map((def) => {
        return createMultilineLabel({
            id: `debug_pkg_sort_data[${def.source}]`,
            label: def.name,
            value: (0, Debug_1.stringifySorting)(def),
        });
    }),
});
exports.packagedSortingSection = packagedSortingSection;
const packagedDebugSearchSection = () => createSection({
    id: 'debug_pkg_debug_data_search',
    header: 'Search Data',
    rows: async () => {
        return Data_1.Data.debug.search.map((search, idx) => {
            return createMultilineLabel({
                id: `debug_pkg_debug_data_search[${idx}]`,
                label: `Search #${idx}`,
                value: (0, Debug_1.stringifySearchOptions)(search),
            });
        });
    },
});
exports.packagedDebugSearchSection = packagedDebugSearchSection;
const packagedDebugReplaceSection = () => createSection({
    id: 'debug_pkg_debug_data_replace',
    header: 'Replacement Data',
    rows: async () => Object.entries(Data_1.Data.debug.replacements).map(([key, replace]) => {
        return createMultilineLabel({
            id: `debug_pkg_debug_data_replace[${key}]`,
            label: key,
            value: replace,
        });
    }),
});
exports.packagedDebugReplaceSection = packagedDebugReplaceSection;

},{"../Data":48,"../Debug":49,"../models":64,"./DebugUI":69}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formattedDataSection = void 0;
const Data_1 = require("../Data");
const Utils_1 = require("../Utils");
const DebugUI_1 = require("./DebugUI");
const formattedDataSection = () => createSection({
    id: 'debug_format',
    header: 'Formatting',
    rows: async () => [formattedPathNavButton()],
});
exports.formattedDataSection = formattedDataSection;
const formattedPathNavButton = () => (0, DebugUI_1.createNavSections)({
    id: 'debug_format_path',
    label: 'Formatted Path',
    sections: async () => [formattedPathSection()],
});
const formattedPathSection = () => createSection({
    id: 'debug_format_path_data',
    header: 'Definitions',
    rows: async () => Object.entries(Data_1.Data.nhentai.paths).map(([key, path]) => {
        return createMultilineLabel({
            id: `debug_format_path_data[${key}]`,
            label: key,
            value: (0, Utils_1.format)(`${Data_1.Data.nhentai.urls[path.url] ?? '_404_'}${path.path}`, Data_1.Data.debug.replacements),
        });
    }),
});

},{"../Data":48,"../Utils":52,"./DebugUI":69}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.langaugeTestsSection = exports.subtitleTestsSection = exports.searchTestsSection = exports.langaugeTestsNavButton = exports.subtitleTestsNavButton = exports.searchTestsNavButton = exports.debugTestsSection = void 0;
const Data_1 = require("../Data");
const Debug_1 = require("../Debug");
const models_1 = require("../models");
const DebugUI_1 = require("./DebugUI");
const debugTestsSection = (states) => createSection({
    id: 'debug_search',
    header: 'Searching',
    footer: "Buttons suffixed with 'w/Settings' includes in-app settings.",
    rows: async () => [
        (0, exports.searchTestsNavButton)(),
        (0, exports.searchTestsNavButton)(states),
        (0, exports.subtitleTestsNavButton)(),
        (0, exports.langaugeTestsNavButton)(),
        (0, exports.langaugeTestsNavButton)(states),
    ],
});
exports.debugTestsSection = debugTestsSection;
const searchTestsNavButton = (states) => {
    const id = `debug_tests_search${states != undefined ? '_settings' : ''}`;
    return (0, DebugUI_1.createNavSections)({
        id: id,
        label: `Search tests${states != undefined ? ' w/Settings' : ''}`,
        sections: async () => [(0, exports.searchTestsSection)(states)],
    });
};
exports.searchTestsNavButton = searchTestsNavButton;
const subtitleTestsNavButton = () => (0, DebugUI_1.createNavSections)({
    id: 'debug_tests_subtitle',
    label: 'Subtitle tests',
    sections: async () => [(0, exports.subtitleTestsSection)()],
});
exports.subtitleTestsNavButton = subtitleTestsNavButton;
const langaugeTestsNavButton = (states) => {
    const id = `debug_tests_language${states != undefined ? '_settings' : ''}`;
    return (0, DebugUI_1.createNavSections)({
        id: id,
        label: `Language emit${states != undefined ? ' w/Settings' : ''}`,
        sections: async () => [(0, exports.langaugeTestsSection)(states)],
    });
};
exports.langaugeTestsNavButton = langaugeTestsNavButton;
const searchTestsSection = (states) => {
    const id = `debug_tests_search${states != undefined ? '_settings' : ''}`;
    return createSection({
        id: `${id}_data`,
        header: 'Output',
        rows: async () => await Promise.all(Data_1.Data.debug.search.map(async (search, idx) => {
            const ctx = await models_1.Search.createWithSettings(states, search.text, search);
            return createMultilineLabel({
                id: `${id}_data[${idx}]`,
                label: `Search #${idx}`,
                value: (0, Debug_1.stringifySearchContext)(ctx),
            });
        })),
    });
};
exports.searchTestsSection = searchTestsSection;
const subtitleTestsSection = () => createSection({
    id: 'debug_tests_subtitle_data',
    header: 'Output',
    rows: async () => await Promise.all((0, Debug_1.combos)(models_1.LangDefs.getSources(true)).map(async (subs, idx) => {
        return createMultilineLabel({
            id: `debug_tests_subtitle_data[${idx}]`,
            label: subs.length > 0 ? subs.join(', ') : 'none',
            value: models_1.LangDefs.getSubtitle(subs),
        });
    })),
});
exports.subtitleTestsSection = subtitleTestsSection;
const langaugeTestsSection = (states) => {
    const id = `debug_tests_language${states != undefined ? '_settings' : ''}`;
    return createSection({
        id: `${id}_data`,
        header: 'Output',
        rows: async () => await Promise.all(
        // prettier-ignore
        (0, Debug_1.combos)([
            ...models_1.LangDefs.getSources(true),
            ...models_1.LangDefs.getSources(true).map((a) => `-${a}`),
        ]).map(async (langs, idx) => {
            const include = langs.filter((a) => !a.startsWith('-'));
            const exclude = langs.filter((a) => a.startsWith('-')).map((a) => a.substring(1));
            const all = include.find((a) => a.startsWith('_')) != undefined;
            const emitted = await models_1.Search.emitLanguagesWithSettings({ include, exclude }, states);
            return createMultilineLabel({
                id: `${id}_data[${idx}]`,
                label: langs.length > 0 ? langs.join(', ') : 'none',
                value: emitted || (all ? '<Include All>' : '<none>'),
            });
        })),
    });
};
exports.langaugeTestsSection = langaugeTestsSection;

},{"../Data":48,"../Debug":49,"../models":64,"./DebugUI":69}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storedSearchHistorySection = exports.clearSearchHistorySection = exports.storedSearchHistoryNavButton = exports.clearSearchHistoryButton = exports.storedSettingsSection = void 0;
const Debug_1 = require("../Debug");
const Settings_1 = require("../Settings");
const DebugUI_1 = require("./DebugUI");
const storedSettingsSection = (states) => createSection({
    id: 'debug_settings',
    header: 'Stored Settings',
    rows: async () => {
        const values = await Promise.all([
            (0, Settings_1.getLanguage)(states),
            (0, Settings_1.getSorting)(states),
            (0, Settings_1.getSearchSuffix)(states),
            (0, Settings_1.getIncognito)(states),
            (0, Settings_1.getDoubleSearch)(states),
            (0, Settings_1.getAlwaysFallback)(states),
            (0, Settings_1.getCollectSearches)(states),
            (0, Settings_1.getLatestSearch)(states),
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
            createMultilineLabel({
                id: 'debug_settings_search_suffix',
                label: 'Search suffix',
                value: values[2],
            }),
            createLabel({
                id: 'debug_settings_incognito',
                label: 'Incognito',
                value: (0, Debug_1.yesno)(values[3]),
            }),
            createLabel({
                id: 'debug_settings_double_search',
                label: 'Double search',
                value: (0, Debug_1.yesno)(values[4]),
            }),
            createLabel({
                id: 'debug_settings_always_fallback',
                label: 'Always fallback',
                value: (0, Debug_1.yesno)(values[5]),
            }),
            createLabel({
                id: 'debug_settings_collect_searches',
                label: 'Collect searches',
                value: (0, Debug_1.yesno)(values[6]),
            }),
            createMultilineLabel({
                id: 'debug_settings_latest_search',
                label: (0, Debug_1.showFrozen)('Latest search', !values[6]),
                value: `${values[7]}`,
            }),
            (0, exports.storedSearchHistoryNavButton)(states),
            (0, exports.clearSearchHistoryButton)(states),
        ];
    },
});
exports.storedSettingsSection = storedSettingsSection;
const clearSearchHistoryButton = (states) => createButton({
    id: 'debug_settings_clear_search_history',
    label: 'Clear search history...',
    value: '',
    onTap: async () => {
        await (0, Settings_1.setSearchHistory)(states, null);
    },
});
exports.clearSearchHistoryButton = clearSearchHistoryButton;
const storedSearchHistoryNavButton = (states) => (0, DebugUI_1.createNavSections)({
    id: 'debug_settings_history',
    label: 'Search history',
    sections: async () => [(0, exports.clearSearchHistorySection)(states), await (0, exports.storedSearchHistorySection)(states)],
});
exports.storedSearchHistoryNavButton = storedSearchHistoryNavButton;
const clearSearchHistorySection = (states) => createSection({
    id: 'debug_settings_history_clear',
    header: 'Data',
    footer: 'Search history saves up to 25 entries.',
    rows: async () => [(0, exports.clearSearchHistoryButton)(states)],
});
exports.clearSearchHistorySection = clearSearchHistorySection;
const storedSearchHistorySection = async (states) => createSection({
    id: 'debug_settings_history_data',
    header: (0, Debug_1.showFrozen)('Search history', !(await (0, Settings_1.getCollectSearches)(states))),
    rows: async () => {
        const history = await (0, Settings_1.getSearchHistory)(states);
        if (history.length <= 0) {
            // prettier-ignore
            return [createLabel({
                    id: 'debug_settings_history_empty',
                    label: 'Search history is empty',
                    value: '',
                })];
        }
        return history.map((entry, idx) => {
            return createMultilineLabel({
                id: `debug_settings_history_data[${idx}]`,
                label: `Entry #${idx + 1}`,
                value: (0, Debug_1.stringifySearchEntry)(entry),
            });
        });
    },
});
exports.storedSearchHistorySection = storedSearchHistorySection;

},{"../Debug":49,"../Settings":51,"./DebugUI":69}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNavSections = exports.overviewSection = exports.overviewSubmit = exports.debugForm = exports.debugNavButton = void 0;
const Settings_1 = require("../Settings");
const DebugDataUI_1 = require("./DebugDataUI");
const DebugFormatUI_1 = require("./DebugFormatUI");
const DebugSearchUI_1 = require("./DebugSearchUI");
const DebugSettingsUI_1 = require("./DebugSettingsUI");
const debugNavButton = (states) => createNavigationButton({
    id: 'debug',
    label: 'Debug',
    value: '',
    form: (0, exports.debugForm)(states),
});
exports.debugNavButton = debugNavButton;
const debugForm = (states, readonly = false) => createForm({
    onSubmit: async (values) => (readonly ? undefined : await (0, exports.overviewSubmit)(states, values)),
    validate: async () => true,
    sections: async () => [
        (0, exports.overviewSection)(states),
        (0, DebugSettingsUI_1.storedSettingsSection)(states),
        (0, DebugSearchUI_1.debugTestsSection)(states),
        (0, DebugDataUI_1.packagedDataSection)(),
        (0, DebugFormatUI_1.formattedDataSection)(),
    ],
});
exports.debugForm = debugForm;
const overviewSubmit = async (states, values) => {
    await Promise.all([
        (0, Settings_1.setCollectSearches)(states, values.collect_searches),
        (0, Settings_1.setAlwaysFallback)(states, values.always_fallback),
    ]);
};
exports.overviewSubmit = overviewSubmit;
const overviewSection = (states) => createSection({
    id: 'debug_overview',
    header: 'Overview',
    footer: 'Always fallback is for debugging, and is limited to 1 request per second. (aka. Slow searching)',
    rows: async () => {
        const values = await Promise.all([(0, Settings_1.getCollectSearches)(states), (0, Settings_1.getAlwaysFallback)(states)]);
        return [
            createSwitch({
                id: 'collect_searches',
                label: 'Collect searches',
                value: values[0],
            }),
            createSwitch({
                id: 'always_fallback',
                label: 'Always fallback',
                value: values[1],
            }),
        ];
    },
});
exports.overviewSection = overviewSection;
const createNavSections = (navSection) => createNavigationButton({
    id: navSection.id,
    label: navSection.label,
    value: '',
    form: createForm({
        onSubmit: async () => undefined,
        validate: async () => true,
        sections: navSection.sections,
    }),
});
exports.createNavSections = createNavSections;

},{"../Settings":51,"./DebugDataUI":65,"./DebugFormatUI":66,"./DebugSearchUI":67,"./DebugSettingsUI":68}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSection = exports.settingsSection = exports.webSubmit = exports.settingsSubmit = exports.settingsForm = exports.settingsNavButton = void 0;
const models_1 = require("../models");
const Settings_1 = require("../Settings");
const Utils_1 = require("../Utils");
const settingsNavButton = (states) => createNavigationButton({
    id: 'settings',
    label: 'Settings',
    value: '',
    form: (0, exports.settingsForm)(states),
});
exports.settingsNavButton = settingsNavButton;
const settingsForm = (states, readonly = false) => createForm({
    onSubmit: async (values) => {
        if (readonly) {
            return;
        }
        await Promise.all([(0, exports.settingsSubmit)(states, values), (0, exports.webSubmit)(states, values)]);
    },
    validate: async () => true,
    sections: async () => [(0, exports.settingsSection)(states), (0, exports.webSection)(states)],
});
exports.settingsForm = settingsForm;
const settingsSubmit = async (states, values) => {
    await Promise.all([
        (0, Settings_1.setLanguage)(states, values.language[0]),
        (0, Settings_1.setSorting)(states, values.sorting[0]),
        (0, Settings_1.setSearchSuffix)(states, (0, Utils_1.dumbify)(values.search_suffix)),
    ]);
};
exports.settingsSubmit = settingsSubmit;
const webSubmit = async (states, values) => {
    await Promise.all([
        (0, Settings_1.setIncognito)(states, values.incognito),
        (0, Settings_1.setDoubleSearch)(states, values.double_search),
    ]);
};
exports.webSubmit = webSubmit;
const settingsSection = (states) => createSection({
    id: 'settings_content',
    header: 'nhentai',
    footer: 'Modify the nhentai experience to your liking.',
    rows: async () => {
        const values = await Promise.all([(0, Settings_1.getLanguage)(states), (0, Settings_1.getSorting)(states), (0, Settings_1.getSearchSuffix)(states)]);
        return [
            createSelect({
                id: 'language',
                label: 'Language',
                options: models_1.LangDefs.getSources(true),
                displayLabel: (option) => models_1.LangDefs.getLocalizedName(option),
                value: [values[0]],
                allowsMultiselect: false,
                minimumOptionCount: 1,
            }),
            createSelect({
                id: 'sorting',
                label: 'Sort by',
                options: models_1.SortDefs.getSources(true),
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
});
exports.settingsSection = settingsSection;
const webSection = (states) => createSection({
    id: 'web',
    header: 'Web Requests',
    footer: 'Double search requests two pages per search. Enable this if your searches stops loading after 1 page.',
    rows: async () => {
        const values = await Promise.all([(0, Settings_1.getIncognito)(states), (0, Settings_1.getDoubleSearch)(states)]);
        return [
            createSwitch({
                id: 'incognito',
                label: 'Incognito',
                value: values[0],
            }),
            createSwitch({
                id: 'double_search',
                label: 'Double search (Slower)',
                value: values[1],
            }),
        ];
    },
});
exports.webSection = webSection;

},{"../Settings":51,"../Utils":52,"../models":64}],71:[function(require,module,exports){
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
// Settings
__exportStar(require("./SettingsUI"), exports);
// Debug
__exportStar(require("./DebugUI"), exports);
__exportStar(require("./DebugDataUI"), exports);
__exportStar(require("./DebugFormatUI"), exports);
__exportStar(require("./DebugSearchUI"), exports);
__exportStar(require("./DebugSettingsUI"), exports);

},{"./DebugDataUI":65,"./DebugFormatUI":66,"./DebugSearchUI":67,"./DebugSettingsUI":68,"./DebugUI":69,"./SettingsUI":70}]},{},[50])(50)
});
