(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeColor = void 0;
var BadgeColor;
(function (BadgeColor) {
    BadgeColor["BLUE"] = "default";
    BadgeColor["GREEN"] = "success";
    BadgeColor["GREY"] = "info";
    BadgeColor["YELLOW"] = "warning";
    BadgeColor["RED"] = "danger";
})(BadgeColor = exports.BadgeColor || (exports.BadgeColor = {}));

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],5:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
/**
* @deprecated Use {@link PaperbackExtensionBase}
*/
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

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = exports.SourceIntents = void 0;
var SourceIntents;
(function (SourceIntents) {
    SourceIntents[SourceIntents["MANGA_CHAPTERS"] = 1] = "MANGA_CHAPTERS";
    SourceIntents[SourceIntents["MANGA_TRACKING"] = 2] = "MANGA_TRACKING";
    SourceIntents[SourceIntents["HOMEPAGE_SECTIONS"] = 4] = "HOMEPAGE_SECTIONS";
    SourceIntents[SourceIntents["COLLECTION_MANAGEMENT"] = 8] = "COLLECTION_MANAGEMENT";
    SourceIntents[SourceIntents["CLOUDFLARE_BYPASS_REQUIRED"] = 16] = "CLOUDFLARE_BYPASS_REQUIRED";
    SourceIntents[SourceIntents["SETTINGS_UI"] = 32] = "SETTINGS_UI";
})(SourceIntents = exports.SourceIntents || (exports.SourceIntents = {}));
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],7:[function(require,module,exports){
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
__exportStar(require("./Source"), exports);
__exportStar(require("./ByteArray"), exports);
__exportStar(require("./Badge"), exports);
__exportStar(require("./interfaces"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./HomeSectionType"), exports);
__exportStar(require("./PaperbackExtensionBase"), exports);

},{"./Badge":1,"./ByteArray":2,"./HomeSectionType":3,"./PaperbackExtensionBase":4,"./Source":5,"./SourceInfo":6,"./interfaces":15}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],15:[function(require,module,exports){
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
__exportStar(require("./ChapterProviding"), exports);
__exportStar(require("./CloudflareBypassRequestProviding"), exports);
__exportStar(require("./HomePageSectionsProviding"), exports);
__exportStar(require("./MangaProgressProviding"), exports);
__exportStar(require("./MangaProviding"), exports);
__exportStar(require("./RequestManagerProviding"), exports);
__exportStar(require("./SearchResultsProviding"), exports);

},{"./ChapterProviding":8,"./CloudflareBypassRequestProviding":9,"./HomePageSectionsProviding":10,"./MangaProgressProviding":11,"./MangaProviding":12,"./RequestManagerProviding":13,"./SearchResultsProviding":14}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],60:[function(require,module,exports){
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
__exportStar(require("./DynamicUI/Exports/DUIBinding"), exports);
__exportStar(require("./DynamicUI/Exports/DUIForm"), exports);
__exportStar(require("./DynamicUI/Exports/DUIFormRow"), exports);
__exportStar(require("./DynamicUI/Exports/DUISection"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIHeader"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIInputField"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUILabel"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUILink"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIMultilineLabel"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUINavigationButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIOAuthButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISecureInputField"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISelect"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIStepper"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISwitch"), exports);
__exportStar(require("./Exports/ChapterDetails"), exports);
__exportStar(require("./Exports/Chapter"), exports);
__exportStar(require("./Exports/Cookie"), exports);
__exportStar(require("./Exports/HomeSection"), exports);
__exportStar(require("./Exports/IconText"), exports);
__exportStar(require("./Exports/MangaInfo"), exports);
__exportStar(require("./Exports/MangaProgress"), exports);
__exportStar(require("./Exports/PartialSourceManga"), exports);
__exportStar(require("./Exports/MangaUpdates"), exports);
__exportStar(require("./Exports/PBCanvas"), exports);
__exportStar(require("./Exports/PBImage"), exports);
__exportStar(require("./Exports/PagedResults"), exports);
__exportStar(require("./Exports/RawData"), exports);
__exportStar(require("./Exports/Request"), exports);
__exportStar(require("./Exports/SourceInterceptor"), exports);
__exportStar(require("./Exports/RequestManager"), exports);
__exportStar(require("./Exports/Response"), exports);
__exportStar(require("./Exports/SearchField"), exports);
__exportStar(require("./Exports/SearchRequest"), exports);
__exportStar(require("./Exports/SourceCookieStore"), exports);
__exportStar(require("./Exports/SourceManga"), exports);
__exportStar(require("./Exports/SecureStateManager"), exports);
__exportStar(require("./Exports/SourceStateManager"), exports);
__exportStar(require("./Exports/Tag"), exports);
__exportStar(require("./Exports/TagSection"), exports);
__exportStar(require("./Exports/TrackedMangaChapterReadAction"), exports);
__exportStar(require("./Exports/TrackerActionQueue"), exports);

},{"./DynamicUI/Exports/DUIBinding":17,"./DynamicUI/Exports/DUIForm":18,"./DynamicUI/Exports/DUIFormRow":19,"./DynamicUI/Exports/DUISection":20,"./DynamicUI/Rows/Exports/DUIButton":21,"./DynamicUI/Rows/Exports/DUIHeader":22,"./DynamicUI/Rows/Exports/DUIInputField":23,"./DynamicUI/Rows/Exports/DUILabel":24,"./DynamicUI/Rows/Exports/DUILink":25,"./DynamicUI/Rows/Exports/DUIMultilineLabel":26,"./DynamicUI/Rows/Exports/DUINavigationButton":27,"./DynamicUI/Rows/Exports/DUIOAuthButton":28,"./DynamicUI/Rows/Exports/DUISecureInputField":29,"./DynamicUI/Rows/Exports/DUISelect":30,"./DynamicUI/Rows/Exports/DUIStepper":31,"./DynamicUI/Rows/Exports/DUISwitch":32,"./Exports/Chapter":33,"./Exports/ChapterDetails":34,"./Exports/Cookie":35,"./Exports/HomeSection":36,"./Exports/IconText":37,"./Exports/MangaInfo":38,"./Exports/MangaProgress":39,"./Exports/MangaUpdates":40,"./Exports/PBCanvas":41,"./Exports/PBImage":42,"./Exports/PagedResults":43,"./Exports/PartialSourceManga":44,"./Exports/RawData":45,"./Exports/Request":46,"./Exports/RequestManager":47,"./Exports/Response":48,"./Exports/SearchField":49,"./Exports/SearchRequest":50,"./Exports/SecureStateManager":51,"./Exports/SourceCookieStore":52,"./Exports/SourceInterceptor":53,"./Exports/SourceManga":54,"./Exports/SourceStateManager":55,"./Exports/Tag":56,"./Exports/TagSection":57,"./Exports/TrackedMangaChapterReadAction":58,"./Exports/TrackerActionQueue":59}],61:[function(require,module,exports){
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
__exportStar(require("./generated/_exports"), exports);
__exportStar(require("./base/index"), exports);
__exportStar(require("./compat/DyamicUI"), exports);

},{"./base/index":7,"./compat/DyamicUI":16,"./generated/_exports":60}],62:[function(require,module,exports){
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
exports.Data = exports.Tags = void 0;
const nhentaiData = __importStar(require("./data/nhentai.json"));
const sourceInfo = __importStar(require("./data/source_info.json"));
exports.Tags = {
    withoutSuffix: 'without_suffix',
    allowEmptySearch: 'allow_empty',
};
exports.Data = {
    nhentai: nhentaiData,
    info: sourceInfo,
};

},{"./data/nhentai.json":66,"./data/source_info.json":67}],63:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NHentai = exports.NHentaiInfo = void 0;
const types_1 = require("@paperback/types");
const models_1 = require("./models");
const Data_1 = require("./Data");
const Utils_1 = require("./Utils");
const Data_2 = require("./Data");
const Resettings_1 = require("./Resettings");
const SettingsUI_1 = require("./ui/SettingsUI");
exports.NHentaiInfo = {
    version: Data_2.Data.info.version,
    name: Data_2.Data.info.name,
    icon: 'icon.png',
    author: Data_2.Data.info.author,
    authorWebsite: Data_2.Data.info.website,
    description: Data_2.Data.info.description,
    contentRating: types_1.ContentRating.ADULT,
    websiteBaseURL: models_1.Urls.api,
    intents: types_1.SourceIntents.MANGA_CHAPTERS | types_1.SourceIntents.HOMEPAGE_SECTIONS | types_1.SourceIntents.CLOUDFLARE_BYPASS_REQUIRED | types_1.SourceIntents.SETTINGS_UI,
    sourceTags: [
        {
            text: '18+',
            type: types_1.BadgeColor.YELLOW,
        },
    ],
};
class NHentai {
    constructor(cheerio) {
        this.cheerio = cheerio;
        this.sourceInterceptor = {
            interceptRequest: (request) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                request.headers = Object.assign(Object.assign({}, ((_a = request.headers) !== null && _a !== void 0 ? _a : {})), {
                    'referer': `${models_1.Urls.api}/`,
                    'user-agent': yield this.requestManager.getDefaultUserAgent(),
                });
                return request;
            }),
            interceptResponse: (response) => __awaiter(this, void 0, void 0, function* () {
                return response;
            }),
        };
        this.requestManager = App.createRequestManager({
            requestsPerSecond: 3,
            requestTimeout: 15000,
            interceptor: this.sourceInterceptor,
        });
        this.fallbackRequestManager = App.createRequestManager({
            requestsPerSecond: 1,
            requestTimeout: 15000,
            interceptor: this.sourceInterceptor,
        });
        this.stateManager = App.createSourceStateManager();
    }
    getSourceMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            return App.createDUISection({
                id: 'main',
                header: 'Source Settings',
                footer: 'You might need to restart the app for some changes to apply visually.',
                isHidden: false,
                rows: () => __awaiter(this, void 0, void 0, function* () {
                    return [
                        (0, SettingsUI_1.settingsNavButton)(this.stateManager, this.requestManager),
                        (0, Resettings_1.resetSettings)(this.stateManager),
                    ];
                }),
            });
        });
    }
    getSearchResults(query, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const ctx = yield models_1.Search.createWithSettings(this.stateManager, query.title, {
                languages: {
                    include: this.resolveLangauges(query.includedTags),
                    exclude: this.resolveLangauges(query.excludedTags),
                },
                sort: this.resolveSorting(query.includedTags),
                suffix: this.resolvesTag(query.includedTags, Data_1.Tags.withoutSuffix) ? '' : undefined,
            });
            const double = yield Resettings_1.Resettings.get(this.stateManager, Resettings_1.SettingKeys.DoubleSearch);
            const results = yield models_1.Search.searchMany(double ? 2 : 1, ctx, this.getSearchObjects(), metadata);
            return App.createPagedResults({
                results: results.partials,
                metadata: results.metadata,
            });
        });
    }
    getSearchTags() {
        return __awaiter(this, void 0, void 0, function* () {
            const sections = {};
            sections.sorting = App.createTagSection({
                id: 'sorting',
                label: 'Sort by (Select one)',
                tags: models_1.SortDefs.getSources(true).map((source) => App.createTag({ id: source, label: models_1.SortDefs.getName(source) })),
            });
            sections.language = App.createTagSection({
                id: 'languages',
                label: 'Languages',
                tags: models_1.LangDefs.getSources(true).map((source) => App.createTag({ id: source, label: models_1.LangDefs.getLocalizedName(source) })),
            });
            sections.other = App.createTagSection({
                id: 'other',
                label: 'Other',
                tags: [
                    App.createTag({ id: Data_1.Tags.withoutSuffix, label: 'Without suffix' }),
                    // Allows for pressing search without actually searching anything.
                    App.createTag({ id: Data_1.Tags.allowEmptySearch, label: 'Allow empty search' }),
                ],
            });
            return Object.values(sections);
        });
    }
    supportsTagExclusion() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    supportsSearchOperators() {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield models_1.Requests.book(this.requestManager, mangaId);
            const parsed = this.checkErrors(data);
            return models_1.BookParser.manga(parsed);
        });
    }
    getMangaShareUrl(mangaId) {
        return `${models_1.Urls.api}/g/${mangaId}`;
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield models_1.Requests.book(this.requestManager, mangaId);
            const parsed = this.checkErrors(data);
            return [models_1.BookParser.chapter(parsed, mangaId)];
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getChapterDetails(mangaId, _chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield models_1.Requests.book(this.requestManager, mangaId);
            const parsed = this.checkErrors(data);
            return models_1.BookParser.chapterDetails(parsed, mangaId);
        });
    }
    getHomePageSections(sectionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            const sections = [];
            for (const source of models_1.SortDefs.getSources(true)) {
                sections.push(App.createHomeSection({
                    id: source,
                    title: models_1.SortDefs.getName(source),
                    type: types_1.HomeSectionType.singleRowNormal,
                    containsMoreItems: true,
                }));
            }
            const searches = [];
            for (const section of sections) {
                sectionCallback(section);
                searches.push(models_1.Search.createWithSettings(this.stateManager, undefined, { sort: section.id }).then((ctx) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const results = yield models_1.Search.search(ctx, this.getSearchObjects(), {});
                    section.items = (_a = results.partials) !== null && _a !== void 0 ? _a : [];
                    section.containsMoreItems = results.metadata.shouldStop === false && section.items.length > 0;
                    sectionCallback(section);
                })));
            }
            yield Promise.all(searches);
        });
    }
    getViewMoreItems(homepageSectionId, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const ctx = yield models_1.Search.createWithSettings(this.stateManager, undefined, { sort: homepageSectionId });
            const results = yield models_1.Search.search(ctx, this.getSearchObjects(), metadata);
            return App.createPagedResults({
                results: results.partials,
                metadata: results.metadata,
            });
        });
    }
    getCloudflareBypassRequestAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            return App.createRequest({
                url: models_1.Urls.api,
                method: 'GET',
                headers: {
                    'referer': `${models_1.Urls.api}/`,
                    'user-agent': yield this.requestManager.getDefaultUserAgent(),
                },
            });
        });
    }
    getSearchObjects() {
        return {
            requests: this.requestManager,
            states: this.stateManager,
            cheerio: this.cheerio,
            fallback: this.fallbackRequestManager,
        };
    }
    checkErrors(data) {
        var _a;
        (0, Utils_1.checkCloudflare)(data.cfChallenge);
        if (data.parsed == null) {
            throw new Error(`Error ${data.status}: ${(_a = data.data) !== null && _a !== void 0 ? _a : 'No data'}`);
        }
        return data.parsed;
    }
    resolveLangauges(tags) {
        var _a;
        return models_1.LangDefs.getFilteredSources((_a = tags === null || tags === void 0 ? void 0 : tags.map((tag) => tag.id)) !== null && _a !== void 0 ? _a : [], true);
    }
    resolveSorting(tags) {
        var _a;
        return models_1.SortDefs.getFilteredSources((_a = tags === null || tags === void 0 ? void 0 : tags.map((tag) => tag.id)) !== null && _a !== void 0 ? _a : [], true)[0];
    }
    resolvesTag(tags, id) {
        return (tags === null || tags === void 0 ? void 0 : tags.find((tag) => tag.id === id)) != undefined;
    }
}
exports.NHentai = NHentai;

},{"./Data":62,"./Resettings":64,"./Utils":65,"./models":77,"./ui/SettingsUI":78,"@paperback/types":61}],64:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetSettings = exports.Resettings = exports.DefaultSettings = exports.SettingKeys = void 0;
const models_1 = require("./models");
const Utils_1 = require("./Utils");
exports.SettingKeys = Object.freeze({
    // History
    CollectSearches: 'collect_searches',
    CollectSearchesLimit: 'collect_searches_limit',
    SearchHistory: 'search_history',
    // Searching
    AlwaysFallback: 'always_fallback',
    DoubleSearch: 'double_search',
    SearchSuffix: 'search_suffix',
    Language: 'language',
    Sorting: 'sorting',
});
exports.DefaultSettings = Object.freeze({
    // History
    [exports.SettingKeys.CollectSearches]: false,
    [exports.SettingKeys.CollectSearchesLimit]: 20,
    [exports.SettingKeys.SearchHistory]: Object.freeze([]),
    // Searching
    [exports.SettingKeys.AlwaysFallback]: false,
    [exports.SettingKeys.DoubleSearch]: false,
    [exports.SettingKeys.SearchSuffix]: '',
    [exports.SettingKeys.Language]: (_a = models_1.LangDefs.getDefault()) !== null && _a !== void 0 ? _a : 'english',
    [exports.SettingKeys.Sorting]: (_b = models_1.SortDefs.getDefault()) !== null && _b !== void 0 ? _b : 'date',
});
exports.Resettings = {
    _isValid(key, val) {
        if (val == undefined) {
            return false;
        }
        const def = exports.DefaultSettings[key];
        if (typeof def !== typeof val) {
            return false;
        }
        if (Array.isArray(def) !== Array.isArray(val)) {
            return false;
        }
        return true;
    },
    set(states, key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (states == undefined) {
                return exports.DefaultSettings[key];
            }
            const old = this.get(states, key);
            if (value == undefined || this._isValid(key, value)) {
                yield states.store(key, value !== null && value !== void 0 ? value : null);
            }
            return old;
        });
    },
    get(states, key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (states == undefined) {
                return exports.DefaultSettings[key];
            }
            const stored = yield states.retrieve(key);
            if (!this._isValid(key, stored)) {
                if (stored !== null) {
                    yield states.store(key, null);
                }
                return exports.DefaultSettings[key];
            }
            return stored;
        });
    },
    has(states, key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (states == undefined) {
                return false;
            }
            const stored = yield states.retrieve(key);
            return this._isValid(key, stored);
        });
    },
    clear(states) {
        return __awaiter(this, void 0, void 0, function* () {
            if (states == undefined) {
                return;
            }
            const tasks = [];
            for (const key of Object.values(exports.SettingKeys)) {
                tasks.push(this.set(states, key));
            }
            yield Promise.allSettled(tasks);
        });
    },
    // Search
    setLanguage(states, source) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.set(states, exports.SettingKeys.Language, models_1.LangDefs.findSource(source !== null && source !== void 0 ? source : undefined));
        });
    },
    setSorting(states, source) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.set(states, exports.SettingKeys.Sorting, models_1.SortDefs.findSource(source !== null && source !== void 0 ? source : undefined));
        });
    },
    setSearchSuffix(states, suffix) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.set(states, exports.SettingKeys.SearchSuffix, suffix != null ? (0, Utils_1.dumbify)(suffix) : undefined);
        });
    },
    // History
    _createHistoryEntry(ctx, results) {
        return {
            text: typeof ctx === 'string' ? ctx : ctx.text,
            sort: typeof ctx !== 'string' ? ctx.sort : undefined,
            stopped: (results === null || results === void 0 ? void 0 : results.partials) == undefined || results.partials.length <= 0,
            status: results === null || results === void 0 ? void 0 : results.status,
            challenged: results === null || results === void 0 ? void 0 : results.challenged,
            skipped: results === null || results === void 0 ? void 0 : results.skip,
            reason: results === null || results === void 0 ? void 0 : results.reason,
            fallback: results === null || results === void 0 ? void 0 : results.fallback,
            nextPage: results === null || results === void 0 ? void 0 : results.metadata.nextPage,
            maxPage: results === null || results === void 0 ? void 0 : results.metadata.maxPage,
            shouldStop: results === null || results === void 0 ? void 0 : results.metadata.shouldStop,
        };
    },
    addHistoryEntry(states, ctx, results) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.get(states, exports.SettingKeys.CollectSearches))) {
                return;
            }
            const entry = this._createHistoryEntry(ctx, results);
            const history = [...yield this.get(states, exports.SettingKeys.SearchHistory)];
            if (history.length >= (yield this.get(states, exports.SettingKeys.CollectSearchesLimit))) {
                history.pop();
            }
            history.splice(0, 0, entry);
            yield this.set(states, exports.SettingKeys.SearchHistory, history);
        });
    },
    _clamp(val, boundA, boundB) {
        const min = Math.min(boundA, boundB);
        const max = Math.max(boundA, boundB);
        return Math.min(Math.max(val, min), max);
    },
    setLimit(states, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.set(states, exports.SettingKeys.CollectSearchesLimit, limit != null ? Math.floor(this._clamp(limit, 10, 250)) : undefined);
        });
    },
};
const resetSettings = (states) => App.createDUIButton({
    id: 'reset',
    label: 'Reset to Default',
    onTap: () => exports.Resettings.clear(states),
});
exports.resetSettings = resetSettings;

},{"./Utils":65,"./models":77}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCloudflare = exports.dumbify = exports.asArray = exports.orderedSortWith = exports.orderedSort = exports.format = void 0;
const Data_1 = require("./Data");
/**
 * A simple string formatter, which replaces named {curly_braces}
 * with the given replacements.
 * @param source The source string.
 * @param replacements The replacements to use.
 * @returns The formatted string.
 */
const format = (source, replacements) => {
    return source.replace(/{(\w+)}/g, (placeholderWithDelimiters, placeholderWithoutDelimiters) => { var _a; return (_a = replacements[placeholderWithoutDelimiters]) !== null && _a !== void 0 ? _a : placeholderWithDelimiters; });
};
exports.format = format;
/**
 * Sorts a copy of the array by {@link Ordered.order} and returns the result.
 * @param sortable An array of ordered objects.
 * @returns The sorted result.
 */
const orderedSort = (sortable) => {
    return [...sortable].sort((a, b) => { var _a, _b; return ((_a = a === null || a === void 0 ? void 0 : a.order) !== null && _a !== void 0 ? _a : Infinity) - ((_b = b === null || b === void 0 ? void 0 : b.order) !== null && _b !== void 0 ? _b : Infinity); });
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
const checkCloudflare = (challenged) => {
    if (challenged) {
        throw new Error(`Cloudflare Challenge:\nPlease go to the homepage of ${Data_1.Data.info.name} and press the cloud icon.`);
    }
};
exports.checkCloudflare = checkCloudflare;

},{"./Data":62}],66:[function(require,module,exports){
module.exports={
    "emptySearch": "pages:>0",
    "bookRegex": "^\\s*#?\\s*(\\d+)\\s*$",
    "urls": {
        "api": "https://nhentai.net",
        "thumbnails": "https://t.nhentai.net",
        "images": "https://i.nhentai.net",
        "cloudflare": "https://nhentai.net"
    },
    "paths": {
        "search": {
            "path": "/api/galleries/search?query={encoded_query}&page={page}",
            "baseUrl": "api"
        },
        "searchSorted": {
            "path": "/api/galleries/search?query={encoded_query}&page={page}&sort={sort}",
            "baseUrl": "api"
        },
        "searchFallback": {
            "path": "/search?q={encoded_query}&page={page}",
            "baseUrl": "api"
        },
        "searchSortedFallback": {
            "path": "/search?q={encoded_query}&page={page}&sort={sort}",
            "baseUrl": "api"
        },
        "gallery": {
            "path": "/api/gallery/{book_id}",
            "baseUrl": "api"
        },
        "galleryCover": {
            "path": "/galleries/{media_id}/cover.{extension}",
            "baseUrl": "thumbnails"
        },
        "galleryPage": {
            "path": "/galleries/{media_id}/{page}.{extension}",
            "baseUrl": "images"
        }
    },
    "languages": [
        {
            "name": "Include all",
            "default": true,
            "short": "??",
            "source": "_all",
            "code": "??",
            "order": 0
        },
        {
            "name": "English",
            "localized": "English",
            "short": "🇬🇧",
            "source": "english",
            "tag": 12227,
            "order": 1
        },
        {
            "name": "Japanese",
            "localized": "日本語",
            "short": "🇯🇵",
            "source": "japanese",
            "tag": 6346,
            "order": 2
        },
        {
            "name": "Chinese (Simplified)",
            "localized": "中文 (简化字)",
            "short": "🇨🇳",
            "source": "chinese",
            "tag": 29963,
            "order": 3
        }
    ],
    "sorting": [
        {
            "name": "Popular all-time",
            "default": true,
            "source": "popular",
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

},{}],67:[function(require,module,exports){
module.exports={
    "name": "nhentai",
    "version": "3.0.0",
    "author": "CookieSylvia",
    "website": "https://github.com/CookieSylvia/cookies-extensions",
    "description": "Extension which pulls 18+ content from nhentai."
}

},{}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookParser = void 0;
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
            .map((tag) => App.createTag({ id: tag.id.toString(), label: tag.name }));
        const artist = getArtist(book);
        return App.createSourceManga({
            id: book.bookId.toString(),
            mangaInfo: App.createMangaInfo({
                image: Urls_1.Paths.galleryCover(book.mediaId, book.images.cover.type),
                artist: artist,
                author: artist,
                desc: `#${book.bookId}\nPages: ${book.pages}\nFavorites: ${book.favorites}`,
                status: 'Completed',
                hentai: true,
                titles: book.titles.priority,
                tags: [App.createTagSection({ id: 'tags', label: 'Tags', tags })],
            }),
        });
    },
    /**
       * Parses a {@link Book} into a {@link PartialSourceManga} using {@link App.createPartialSourceManga}.
       * @param book The provided {@link Book}.
       * @returns The parsed partial manga.
       */
    partial: (book) => App.createPartialSourceManga({
        mangaId: book.bookId.toString(),
        image: Urls_1.Paths.galleryCover(book.mediaId, book.images.cover.type),
        title: book.titles.pretty,
        subtitle: Languages_1.LangDefs.getSubtitle(getLanguages(book), true),
    }),
    /**
       * Parses a {@link Booklet} into a {@link PartialSourceManga} using {@link App.createPartialSourceManga}.
       * @param booklet The provided {@link Booklet}.
       * @returns The parsed partial manga.
       */
    partialFallback: (booklet) => App.createPartialSourceManga({
        mangaId: booklet.bookId,
        image: booklet.thumbnail,
        title: booklet.title,
        subtitle: booklet.languages.length > 0 ? `${Languages_1.LangDefs.getSubtitle(booklet.languages, true)}?` : 'Fallback',
    }),
    /**
       * Parses a {@link Book} into a {@link Chapter} using {@link createChapter} with an optional {@link mangaId}.
       * @param book The provided {@link Book}.
       * @param mangaId The provided bookId.
       * @returns The parsed chapter.
       */
    chapter: (book, mangaId) => App.createChapter({
        id: mangaId !== null && mangaId !== void 0 ? mangaId : book.bookId.toString(),
        chapNum: 1,
        name: book.titles.english,
        langCode: Languages_1.LangDefs.getSubtitle(getLanguages(book), true, true),
        time: new Date(book.uploaded),
    }),
    /**
       * Parses a {@link Book} into {@link ChapterDetails} using {@link createChapterDetails} with an optional {@link mangaId}.
       * @param book The provided {@link Book}.
       * @param mangaId  The provided bookId.
       * @returns The parsed chapter details.
       */
    chapterDetails: (book, mangaId) => App.createChapterDetails({
        id: mangaId !== null && mangaId !== void 0 ? mangaId : book.bookId.toString(),
        mangaId: mangaId !== null && mangaId !== void 0 ? mangaId : book.bookId.toString(),
        pages: book.images.pages.map((image, idx) => Urls_1.Paths.galleryPage(book.mediaId, idx + 1, image.type)),
    }),
};

},{"./BookTypes":69,"./Languages":72,"./Urls":76}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookTagType = exports.ImageType = void 0;
var ImageType;
(function (ImageType) {
    ImageType["JPG"] = "jpg";
    ImageType["PNG"] = "png";
    ImageType["GIF"] = "gif";
})(ImageType || (exports.ImageType = ImageType = {}));
var BookTagType;
(function (BookTagType) {
    BookTagType["Artist"] = "artist";
    BookTagType["Category"] = "category";
    BookTagType["Character"] = "character";
    BookTagType["Groups"] = "groups";
    BookTagType["Language"] = "language";
    BookTagType["Parody"] = "parody";
    BookTagType["Tag"] = "tag";
})(BookTagType || (exports.BookTagType = BookTagType = {}));

},{}],70:[function(require,module,exports){
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const priority = [titles.english, titles.japanese, titles.pretty].filter((title) => title != null);
        // tranformation:
        // - native? -> pretty? -> opposite? -> no title
        return {
            english: (_c = (_b = (_a = titles.english) !== null && _a !== void 0 ? _a : titles.pretty) !== null && _b !== void 0 ? _b : titles.japanese) !== null && _c !== void 0 ? _c : '(no title)',
            japanese: (_f = (_e = (_d = titles.japanese) !== null && _d !== void 0 ? _d : titles.pretty) !== null && _e !== void 0 ? _e : titles.english) !== null && _f !== void 0 ? _f : '(no title)',
            pretty: (_j = (_h = (_g = titles.pretty) !== null && _g !== void 0 ? _g : titles.english) !== null && _h !== void 0 ? _h : titles.japanese) !== null && _j !== void 0 ? _j : '(no title)',
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
            var _a, _b;
            // $ a[href]
            const link = $(self).find('a').attr('href');
            const bookId = (_a = /(\d+)/.exec(link !== null && link !== void 0 ? link : '')) === null || _a === void 0 ? void 0 : _a[0];
            // $ .caption
            const title = $(self).find('.caption').text();
            // $ img[data-src]
            const thumbnail = $(self).find('img').attr('data-src');
            if (bookId == undefined || title == undefined || thumbnail == undefined) {
                console.log(`Unable to cheerio booklet ${idx}: ${$(self).html()}`);
                return;
            }
            // $ [data-tags]
            const tagIds = ((_b = $(self).attr('data-tags')) !== null && _b !== void 0 ? _b : '').split(' ');
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

},{"./BookTypes":69,"./Languages":72}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],72:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangDefs = exports.LanguageDefinitions = void 0;
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
        return (sort ? this.sorted : this.defs).map((def) => def.source);
    }
    /**
     * Tries to find the definition that the provided source belongs to.
     * @param source The source to search with.
     * @returns A copy of the language definition.
     */
    getDefinition(source) {
        const found = this.defs.find((def) => def.source === source);
        return found != undefined ? Object.assign({}, found) : undefined;
    }
    /**
     * Tries to find the source using the provided source.
     * @param source The source to find.
     * @returns The source, if found in any definition.
     */
    findSource(source) {
        var _a;
        return (_a = this.getDefinition(source)) === null || _a === void 0 ? void 0 : _a.source;
    }
    /**
     * Filters the provided sources with known sources.
     * @param sources The provided sources.
     * @param sort Wether to sort the sources first.
     * @param includeAll Wether to include sources starting with '_'
     * @returns A copy of provided sources filtered by all known sources.
     */
    getFilteredSources(sources, sort = false, includeAll = true) {
        const filtered = this.getSources(sort).filter((def) => sources.includes(def));
        return includeAll ? filtered : filtered.filter((def) => !def.startsWith('_'));
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
            .filter((def) => { var _a, _b; return tagIds.map((tags) => tags.toString()).includes((_b = (_a = def.tag) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '-1'); })
            .map((def) => def.source);
    }
    /**
     * Tries to find the source using the provided tag id.
     * @param tagId The provided tag id.
     * @returns The source found by using the tag id.
     */
    getSourceFromTag(tagId) {
        var _a;
        return (_a = this.defs.find((lang) => { var _a; return ((_a = lang.tag) === null || _a === void 0 ? void 0 : _a.toString()) === tagId; })) === null || _a === void 0 ? void 0 : _a.source;
    }
    /**
   * Finds the default source.
   * @returns The default source.
   */
    getDefault() {
        var _a;
        return (_a = this.defs.find((lang) => lang.default)) === null || _a === void 0 ? void 0 : _a.source;
    }
    /**
     * Finds the source's name.
     * E.g. chinese = Chinese
     * @param source The source.
     * @returns The source's name.
     */
    // name -> Unknown '<source>'
    getName(source) {
        var _a, _b;
        return (_b = (_a = this.getDefinition(source)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : `Unknown '${source}'`;
    }
    /**
     * Finds the source's short name.\
     * E.g. english = EN
     * @param source The source.
     * @returns The source's short name.
     */
    // short -> <source>[2,-2].upper()
    getShortName(source) {
        var _a, _b;
        return (_b = (_a = this.getDefinition(source)) === null || _a === void 0 ? void 0 : _a.short) !== null && _b !== void 0 ? _b : source.substring(2, -2).toUpperCase();
    }
    /**
     * Finds the source's localized name.\
     * E.g. japanese = 日本語
     * @param source The source.
     * @returns The source's localized name.
     */
    // localized -> name...
    getLocalizedName(source) {
        var _a, _b;
        return (_b = (_a = this.getDefinition(source)) === null || _a === void 0 ? void 0 : _a.localized) !== null && _b !== void 0 ? _b : this.getName(source);
    }
    /**
       * Finds the prioritized language code by using the source's order.
       * @param sources The provided sources.
       * @returns The prioritized language code by source order.
       */
    getPriorityShortName(sources) {
        var _a;
        const sorted = this.getSorted(sources);
        return this.getShortName((_a = sorted[0]) !== null && _a !== void 0 ? _a : '_all');
    }
    /**
     * Finds the source's tag id.\
     * E.g. japanese = 6346
     * @param source The source.
     * @returns The source's tag id.
     */
    getTagId(source) {
        var _a, _b;
        return (_b = (_a = this.getDefinition(source)) === null || _a === void 0 ? void 0 : _a.tag) !== null && _b !== void 0 ? _b : -1;
    }
    /**
     * Finds the source's display order.\
     * E.g. chinese = 3
     * @param source The source.
     * @returns The source's display order.
     */
    getOrder(source) {
        var _a, _b;
        return (_b = (_a = this.getDefinition(source)) === null || _a === void 0 ? void 0 : _a.order) !== null && _b !== void 0 ? _b : Infinity;
    }
    /**
     * Combines the provided sources into a subtitle
     * displayed below covers when searching.
     * @param sources The provided sources.
     * @param sort Wether to sort the sources first.
     * @returns The source(s) combined into a subtitle.
     */
    getSubtitle(sources, sort = true, alwaysShort = false) {
        var _a;
        const filtered = this.getFilteredSources(sources, sort);
        if (filtered.length <= 0) {
            return alwaysShort ? '??' : 'Unknown';
        }
        if (filtered.length === 1 && !alwaysShort) {
            return this.getName((_a = filtered[0]) !== null && _a !== void 0 ? _a : 'Unknown');
        }
        return filtered.map((lang) => this.getShortName(lang)).join('|');
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

},{"../Data":62,"../Utils":65}],73:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requests = void 0;
const Urls_1 = require("./Urls");
const GalleryParser_1 = require("./GalleryParser");
const isStatusSuccess = (status) => status >= 200 && status <= 299;
const isChallenged = (response) => { var _a, _b; return ((_b = (_a = response.headers) === null || _a === void 0 ? void 0 : _a['cf-mitigated']) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'challenge'; };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const acceptJson = (parser) => {
    return (str) => __awaiter(void 0, void 0, void 0, function* () {
        return yield parser(JSON.parse(str));
    });
};
const acceptCheerio = (cheerio, parser) => {
    return (str) => __awaiter(void 0, void 0, void 0, function* () {
        return yield parser(cheerio.load(str));
    });
};
const getParsed = (requests, request, parser) => __awaiter(void 0, void 0, void 0, function* () {
    // Destructing this doesn't seem to work correctly... for some reason.
    const response = yield requests.schedule(request, 1);
    if (response.data && isStatusSuccess(response.status)) {
        return {
            data: response.data,
            status: response.status,
            cfChallenge: isChallenged(response),
            parsed: yield parser(response.data),
        };
    }
    return {
        data: response.data,
        status: response.status,
        cfChallenge: isChallenged(response),
    };
});
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
    search: (requests, query, page, sort) => __awaiter(void 0, void 0, void 0, function* () {
        const request = App.createRequest({
            url: Urls_1.Paths.search(query, page, sort),
            method: 'GET',
        });
        return yield getParsed(requests, request, acceptJson(GalleryParser_1.GalleryParser.books));
    }),
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
    searchFallback: (requests, cheerio, query, page, sort) => __awaiter(void 0, void 0, void 0, function* () {
        const request = App.createRequest({
            url: Urls_1.Paths.searchFallback(query, page, sort),
            method: 'GET',
        });
        return yield getParsed(requests, request, acceptCheerio(cheerio, GalleryParser_1.GalleryParser.booklets));
    }),
    /**
     * Sends a gallery request using all provided parameters.
     * Returns a response with a {@link Book} if successful.
     * @param requests The request manager.
     * @param bookId The bookId.
     * @returns A parsed response with a {@link Book}.
     */
    book: (requests, bookId) => __awaiter(void 0, void 0, void 0, function* () {
        const request = App.createRequest({
            url: Urls_1.Paths.gallery(bookId),
            method: 'GET',
        });
        return yield getParsed(requests, request, acceptJson(GalleryParser_1.GalleryParser.book));
    }),
};

},{"./GalleryParser":70,"./Urls":76}],74:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = exports.BookRegex = exports.EmptySearch = void 0;
const Data_1 = require("../Data");
const Languages_1 = require("./Languages");
const Utils_1 = require("../Utils");
const Sorting_1 = require("./Sorting");
const Requests_1 = require("./Requests");
const BookParser_1 = require("./BookParser");
const Resettings_1 = require("../Resettings");
/**
 * Empty queries results in an error, so we get
 * around this error by searching for
 * something all books has when empty.
 * (In this case 'pages:>0')
 */
exports.EmptySearch = Data_1.Data.nhentai.emptySearch;
/**
 * The regex for matching book ids.
 * The first ($1) group contains the id.
 */
exports.BookRegex = Data_1.Data.nhentai.bookRegex;
// The nhentai api is veery unstable when searching/not well defined, and can fail often
// so we scrape the site as a fallback when we get expected errors.
// As a last resort, the page will be outright skipped.
exports.Search = {
    searchMany: (pages, ctx, objects, metadata) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let partials = [];
        const history = [];
        for (let i = 0; i < pages; i++) {
            const results = yield exports.Search.search(ctx, objects, metadata);
            history.push({ ctx: ctx, results: results });
            partials = partials.concat((_a = results.partials) !== null && _a !== void 0 ? _a : []);
            metadata = results.metadata;
            if (metadata.shouldStop || ((_b = results.partials) !== null && _b !== void 0 ? _b : []).length <= 0) {
                break;
            }
        }
        return {
            history: history,
            partials: partials,
            metadata: metadata !== null && metadata !== void 0 ? metadata : {},
        };
    }),
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
    search: (ctx, objects, metadata) => __awaiter(void 0, void 0, void 0, function* () {
        let results;
        try {
            results = yield exports.Search.searchInternal(ctx, objects, metadata);
        }
        finally {
            // #add only does something when history is enabled.
            yield Resettings_1.Resettings.addHistoryEntry(objects.states, ctx, results);
        }
        return results;
    }),
    /**
     * Used for searching without side-effects for internal use, use {@link Search.search} instead.
     * @param ctx The search context.
     * @param objects The search objects.
     * @param metadata The persistant search metadata.
     * @returns The search results.
     */
    searchInternal: (ctx, objects, metadata) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d, _e, _f;
        let page = (_c = metadata === null || metadata === void 0 ? void 0 : metadata.nextPage) !== null && _c !== void 0 ? _c : 1;
        // 3 pages. | page, page + 1, page + 2
        const softMax = page + 2;
        if ((metadata === null || metadata === void 0 ? void 0 : metadata.shouldStop) || page > ((_d = metadata === null || metadata === void 0 ? void 0 : metadata.maxPage) !== null && _d !== void 0 ? _d : page)) {
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
        const alwaysFallback = (_e = yield Resettings_1.Resettings.get(objects.states, Resettings_1.SettingKeys.AlwaysFallback)) !== null && _e !== void 0 ? _e : false;
        while (page <= ((_f = metadata === null || metadata === void 0 ? void 0 : metadata.maxPage) !== null && _f !== void 0 ? _f : softMax)) {
            if (!alwaysFallback) {
                // Search by API
                const byApi = yield exports.Search.searchApi(ctx, objects, Object.assign(Object.assign({}, metadata), { nextPage: page }), true);
                if (!byApi.skip) {
                    return byApi;
                }
            }
            if (objects.cheerio != undefined) {
                if (!alwaysFallback) {
                    console.log(`Unable to find page ${page} using api, trying fallback.`);
                }
                // Search by Fallback
                const byFallback = yield exports.Search.searchFallback(ctx, objects, Object.assign(Object.assign({}, metadata), { nextPage: page }));
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
    }),
    /**
     * Searches for books using provided context, objects & metadata with the API.\
     * *If {@link SearchMetadata.maxPage} is undefined, care should be taken for the next page.*
     * ***Prefer using {@link Search.searchInternal} instead***
     * @param ctx The search context.
     * @param objects The search objects.
     * @param metadata The persistant search metadata.
     * @returns The search results.
     */
    searchApi: (ctx, objects, metadata, canFallback) => __awaiter(void 0, void 0, void 0, function* () {
        var _g, _h;
        if (ctx.bookId || new RegExp(exports.BookRegex).test(ctx.text)) {
            throw new Error(`Search doesn't support text searches that matches book ids. (${ctx.text})`);
        }
        const page = (_g = metadata === null || metadata === void 0 ? void 0 : metadata.nextPage) !== null && _g !== void 0 ? _g : 1;
        if ((metadata === null || metadata === void 0 ? void 0 : metadata.shouldStop) || page > ((_h = metadata === null || metadata === void 0 ? void 0 : metadata.maxPage) !== null && _h !== void 0 ? _h : page)) {
            return {
                metadata: {
                    shouldStop: true,
                },
                reason: 'Should stop.',
            };
        }
        const data = yield Requests_1.Requests.search(objects.requests, ctx.text, page, ctx.sort);
        (0, Utils_1.checkCloudflare)(data.cfChallenge);
        if (data.parsed != undefined) {
            const shouldStop = page + 1 > data.parsed.pages;
            return {
                partials: data.parsed.books.map((book) => BookParser_1.BookParser.partial(book)),
                metadata: {
                    nextPage: page + 1,
                    maxPage: data.parsed.pages,
                    shouldStop,
                },
                status: data.status,
                challenged: data.cfChallenge,
                reason: shouldStop ? 'End of pages.' : 'Search',
            };
        }
        // This can also just happen sometimes... for some reason. :D
        // Fallback search should be used in that case.
        // Search should skip if we shouldn't stop.
        if (data.status === 404) {
            const shouldStop = (metadata === null || metadata === void 0 ? void 0 : metadata.maxPage) != undefined ? page + 1 > metadata.maxPage : undefined;
            const shouldSkip = !shouldStop || canFallback;
            return {
                metadata: {
                    nextPage: page + 1,
                    maxPage: metadata === null || metadata === void 0 ? void 0 : metadata.maxPage,
                    shouldStop,
                },
                skip: shouldSkip,
                status: data.status,
                challenged: data.cfChallenge,
                reason: shouldSkip ? 'Search skipped.' : 'Skipped to end of pages.',
            };
        }
        throw new Error(`Request Error ${data.status}: ${data.data}`);
    }),
    /**
     * Searches for books using provided context, objects & metadata with the fallback page scraping.\
     * *If {@link SearchMetadata.maxPage} is undefined, care should be taken for the next page.*
     * ***Prefer using {@link Search.searchInternal} instead***
     * @param ctx The search context.
     * @param objects The search objects.
     * @param metadata The persistant search metadata.
     * @returns The search results.
     */
    searchFallback: (ctx, objects, metadata) => __awaiter(void 0, void 0, void 0, function* () {
        var _j, _k, _l;
        if (ctx.bookId || new RegExp(exports.BookRegex).test(ctx.text)) {
            throw new Error(`Fallback doesn't support book id searches, as they usually respond with a book instead. (${ctx.text})`);
        }
        if (objects.cheerio == undefined) {
            throw new Error('A Cheerio object is required for fallback.');
        }
        const page = (_j = metadata === null || metadata === void 0 ? void 0 : metadata.nextPage) !== null && _j !== void 0 ? _j : 1;
        const shouldStop = (metadata === null || metadata === void 0 ? void 0 : metadata.maxPage) != undefined ? page + 1 > metadata.maxPage : undefined;
        if ((metadata === null || metadata === void 0 ? void 0 : metadata.shouldStop) || page > ((_k = metadata === null || metadata === void 0 ? void 0 : metadata.maxPage) !== null && _k !== void 0 ? _k : page)) {
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
        const data = yield Requests_1.Requests.searchFallback((_l = objects.fallback) !== null && _l !== void 0 ? _l : objects.requests, objects.cheerio, ctx.text, page, ctx.sort);
        (0, Utils_1.checkCloudflare)(data.cfChallenge);
        if (data.parsed != undefined) {
            return {
                partials: data.parsed.map((booklet) => BookParser_1.BookParser.partialFallback(booklet)),
                metadata: {
                    nextPage: page + 1,
                    maxPage: metadata === null || metadata === void 0 ? void 0 : metadata.maxPage,
                    shouldStop,
                },
                status: data.status,
                challenged: data.cfChallenge,
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
                    maxPage: metadata === null || metadata === void 0 ? void 0 : metadata.maxPage,
                    shouldStop,
                },
                skip: !shouldStop,
                status: data.status,
                challenged: data.cfChallenge,
                reason: shouldStop ? 'Skipped to end of pages. (Fallback)' : 'Search skipped. (Fallback)',
                fallback: true,
            };
        }
        throw new Error(`Request Error (Fallback) ${data.status}: ${data.data}`);
    }),
    /**
     * Searches for the book's identifier.\
     * ***Prefer using {@link Search.searchInternal} instead***
     * @param ctx The search context.
     * @param objects The search objects.
     * @returns The search results.
     */
    searchBookId: (ctx, objects) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ctx.bookId || !new RegExp(exports.BookRegex).test(ctx.text)) {
            throw new Error(`Searching by book id, but '${ctx.text}' is invalid.`);
        }
        const data = yield Requests_1.Requests.book(objects.requests, ctx.text);
        (0, Utils_1.checkCloudflare)(data.cfChallenge);
        if (data.parsed != undefined) {
            return {
                partials: [BookParser_1.BookParser.partial(data.parsed)],
                metadata: {
                    shouldStop: true,
                },
                status: data.status,
                challenged: data.cfChallenge,
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
                challenged: data.cfChallenge,
                reason: 'Book id not found.',
            };
        }
        throw new Error(`Request Error (BookId) ${data.status}: ${data.data}`);
    }),
    /**
     * Creates a {@link SearchContext} from the provided parameters.
     * The context can be used in any of the search methods.
     * @param text The provided text.
     * @param options The provided options.
     * @returns The search context.
     */
    create: (text, options) => {
        var _a;
        const bookId = new RegExp(exports.BookRegex).exec(text !== null && text !== void 0 ? text : '');
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
        const langs = exports.Search.emitLanguages(options === null || options === void 0 ? void 0 : options.languages);
        const suffix = (_a = options === null || options === void 0 ? void 0 : options.suffix) !== null && _a !== void 0 ? _a : '';
        const sort = Sorting_1.SortDefs.findSource(options === null || options === void 0 ? void 0 : options.sort);
        const extras = `${langs} ${suffix}`.trim();
        const query = text != undefined ? `${text} ${extras}` : extras;
        return {
            text: query.trim() || (options === null || options === void 0 ? void 0 : options.empty) || exports.EmptySearch,
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
    createWithSettings: (states, text, options) => __awaiter(void 0, void 0, void 0, function* () {
        var _m, _o;
        if (states == undefined) {
            return exports.Search.create(text, options);
        }
        let langCtx = exports.Search.createLanguageContext(options === null || options === void 0 ? void 0 : options.languages);
        if (langCtx.empty) {
            langCtx = exports.Search.createLanguageContext(yield Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.Language));
        }
        return exports.Search.create(text, {
            suffix: (_m = options === null || options === void 0 ? void 0 : options.suffix) !== null && _m !== void 0 ? _m : (yield Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.SearchSuffix)),
            languages: langCtx,
            sort: (_o = options === null || options === void 0 ? void 0 : options.sort) !== null && _o !== void 0 ? _o : (yield Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.Sorting)),
            empty: options === null || options === void 0 ? void 0 : options.empty,
        });
    }),
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
    emitLanguagesWithSettings: (options, states) => __awaiter(void 0, void 0, void 0, function* () {
        let langCtx = exports.Search.createLanguageContext(options);
        if (langCtx.empty && states != undefined) {
            langCtx = exports.Search.createLanguageContext(yield Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.Language));
        }
        return exports.Search.emitLanguages(langCtx);
    }),
};

},{"../Data":62,"../Resettings":64,"../Utils":65,"./BookParser":68,"./Languages":72,"./Requests":73,"./Sorting":75}],75:[function(require,module,exports){
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
        return (sort ? this.sorted : this.defs).map((def) => def.source);
    }
    /**
     * Tries to find the definition that the provided source belongs to.
     * @param source The source to search with.
     * @returns A copy of the sorting definition.
     */
    getDefinition(source) {
        const found = this.defs.find((def) => def.source === source);
        return found != undefined ? Object.assign({}, found) : undefined;
    }
    /**
     * Tries to find the source using the provided source.
     * @param source The source to find.
     * @returns The source, if found in any definition.
     */
    findSource(source) {
        var _a;
        return (_a = this.getDefinition(source)) === null || _a === void 0 ? void 0 : _a.source;
    }
    /**
     * Filters the provided sources with known sources.
     * @param sources The provided sources.
     * @param sort Wether to sort the sources first.
     * @returns A copy of provided sources filtered by all known sources.
     */
    getFilteredSources(sources, sort = false) {
        return this.getSources(sort).filter((def) => sources.includes(def));
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
        var _a;
        return (_a = this.defs.find((def) => def.default)) === null || _a === void 0 ? void 0 : _a.source;
    }
    /**
     * Finds the source's name.
     * E.g. date = Recent
     * @param source The source.
     * @returns The source's name.
     */
    // name -> Unknown '<source>'
    getName(source) {
        var _a, _b;
        return (_b = (_a = this.getDefinition(source)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : `Unknown '${source}'`;
    }
    /**
     * Finds the source's display order.\
     * E.g. popular = 1
     * @param source The source.
     * @returns The source's display order.
     */
    getOrder(source) {
        var _a, _b;
        return (_b = (_a = this.getDefinition(source)) === null || _a === void 0 ? void 0 : _a.order) !== null && _b !== void 0 ? _b : Infinity;
    }
}
exports.SortingDefinitions = SortingDefinitions;
exports.SortDefs = new SortingDefinitions(Data_1.Data.nhentai.sorting);

},{"../Data":62,"../Utils":65}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paths = exports.Urls = void 0;
const Data_1 = require("../Data");
const Utils_1 = require("../Utils");
exports.Urls = Data_1.Data.nhentai.urls;
const construct = (path, replacements) => {
    const url = exports.Urls[path.baseUrl];
    if (url == undefined) {
        throw new Error(`Unable to construct path, unknown baseUrl '${path.baseUrl}'`);
    }
    return (0, Utils_1.format)(`${url}${path.path}`, replacements);
};
exports.Paths = {
    /**
       * Search by query path.
       * @param query The search query.
       * @param page The page.
       * @param sort The sorting mode.
       * @returns The url.
       */
    search: (query, page = 1, sort) => construct(!sort ? Data_1.Data.nhentai.paths.search : Data_1.Data.nhentai.paths.searchSorted, {
        query: query,
        encoded_query: encodeURIComponent(query),
        page: page.toString(),
        sort: sort !== null && sort !== void 0 ? sort : '',
    }),
    /**
       * Search by query path. (fallback)
       * @param query The search query.
       * @param page The page.
       * @param sort The sorting mode.
       * @returns The url.
       */
    searchFallback: (query, page = 1, sort) => construct(!sort ? Data_1.Data.nhentai.paths.searchFallback : Data_1.Data.nhentai.paths.searchSortedFallback, {
        query: query,
        encoded_query: encodeURIComponent(query),
        page: page.toString(),
        sort: sort !== null && sort !== void 0 ? sort : '',
    }),
    /**
       * Gallery content path.
       * @param bookId The bookId.
       * @returns The url.
       */
    gallery: (bookId) => construct(Data_1.Data.nhentai.paths.gallery, {
        book_id: bookId.toString(),
    }),
    /**
       * Gallery's cover image path.
       * @param mediaId The mediaId. (This is different from bookId)
       * @param extension Image extension
       * @returns The url.
       */
    galleryCover: (mediaId, extension) => construct(Data_1.Data.nhentai.paths.galleryCover, {
        media_id: mediaId.toString(),
        extension: extension,
    }),
    /**
       * Gallery's page image path.
       * @param mediaId The mediaId. (This is different from bookId)
       * @param page The page.
       * @param extension The image extension.
       * @returns The url.
       */
    galleryPage: (mediaId, page, extension) => construct(Data_1.Data.nhentai.paths.galleryPage, {
        media_id: mediaId.toString(),
        page: page.toString(),
        extension: extension,
    }),
};

},{"../Data":62,"../Utils":65}],77:[function(require,module,exports){
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

},{"./BookParser":68,"./BookTypes":69,"./GalleryParser":70,"./GalleryTypes":71,"./Languages":72,"./Requests":73,"./Search":74,"./Sorting":75,"./Urls":76}],78:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storedSearchHistorySection = exports.clearSearchHistorySection = exports.storedSearchHistoryNavButton = exports.dangerSection = exports.webSection = exports.settingsSection = exports.noticesMoreSection = exports.noticesMoreNavButton = exports.noticesSection = exports.settingsNavButton = void 0;
const models_1 = require("../models");
const Resettings_1 = require("../Resettings");
const Data_1 = require("../Data");
const settingsNavButton = (states, requests) => {
    return App.createDUINavigationButton({
        id: 'settings',
        label: 'Settings',
        form: App.createDUIForm({
            sections: () => __awaiter(void 0, void 0, void 0, function* () {
                return [
                    (0, exports.noticesSection)(states, requests),
                    (0, exports.settingsSection)(states),
                    (0, exports.webSection)(states),
                    (0, exports.dangerSection)(states),
                ];
            }),
        }),
    });
};
exports.settingsNavButton = settingsNavButton;
const noticesSection = (states, requests) => App.createDUISection({
    id: 'notices',
    header: 'Notices',
    isHidden: false,
    rows: () => __awaiter(void 0, void 0, void 0, function* () {
        return [
            App.createDUIMultilineLabel({
                id: 'notice_unstable',
                label: 'Unstable',
                value: 'Changing settings is very unstable atm. but it should still be possible with a few tries.',
            }),
            (0, exports.noticesMoreNavButton)(states, requests),
        ];
    }),
});
exports.noticesSection = noticesSection;
const noticesMoreNavButton = (states, requests) => App.createDUINavigationButton({
    id: 'notice_detailed_nav',
    label: 'View all notices',
    form: App.createDUIForm({
        sections: () => __awaiter(void 0, void 0, void 0, function* () {
            return Promise.all([
                (0, exports.noticesMoreSection)(states, requests),
            ]);
        }),
    }),
});
exports.noticesMoreNavButton = noticesMoreNavButton;
const noticesMoreSection = (states, requests) => App.createDUISection({
    id: 'notice_detailed',
    header: 'Notices',
    isHidden: false,
    rows: () => __awaiter(void 0, void 0, void 0, function* () {
        return [
            App.createDUIMultilineLabel({
                id: 'notice_unstable',
                label: 'Unstable',
                value: 'Changing settings is very unstable atm. but it should still be possible with a few tries.\n(As far as I know, this is a bug in the app? Since the official extension settings also crashes sometimes.)',
            }),
            App.createDUIMultilineLabel({
                id: 'notice_ua',
                label: 'User Agent',
                value: yield requests.getDefaultUserAgent(),
            }),
            App.createDUIMultilineLabel({
                id: 'notice_settingkeys',
                label: 'Setting Keys (found)',
                value: yield ((states) => __awaiter(void 0, void 0, void 0, function* () {
                    let str = '';
                    for (const key of Object.values(Resettings_1.SettingKeys)) {
                        str += `${key}: ${yesno(yield Resettings_1.Resettings.has(states, key))}\n`;
                    }
                    return str.trimEnd();
                }))(states),
            }),
            App.createDUIMultilineLabel({
                id: 'notice_sourceinfo',
                label: 'Source Info',
                value: Object.entries(Data_1.Data.info)
                    .filter(([, value]) => typeof value === 'string')
                    .map(([key, value]) => `${key}: ${value}`).join('\n'),
            }),
        ];
    }),
});
exports.noticesMoreSection = noticesMoreSection;
const settingsSection = (states) => App.createDUISection({
    id: 'settings_content',
    header: 'nhentai',
    footer: 'Modify the nhentai experience to your liking.',
    isHidden: false,
    rows: () => __awaiter(void 0, void 0, void 0, function* () {
        return [
            App.createDUISelect({
                id: 'language',
                label: 'Language',
                options: models_1.LangDefs.getSources(true),
                labelResolver: (option) => __awaiter(void 0, void 0, void 0, function* () { return models_1.LangDefs.getLocalizedName(option); }),
                value: App.createDUIBinding({
                    get: () => __awaiter(void 0, void 0, void 0, function* () { return [yield Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.Language)]; }),
                    set: (val) => __awaiter(void 0, void 0, void 0, function* () {
                        yield Resettings_1.Resettings.setLanguage(states, val === null || val === void 0 ? void 0 : val[0]);
                    }),
                }),
                allowsMultiselect: false,
            }),
            App.createDUISelect({
                id: 'sorting',
                label: 'Sort by',
                options: models_1.SortDefs.getSources(true),
                labelResolver: (option) => __awaiter(void 0, void 0, void 0, function* () { return models_1.SortDefs.getName(option); }),
                value: App.createDUIBinding({
                    get: () => __awaiter(void 0, void 0, void 0, function* () { return [yield Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.Sorting)]; }),
                    set: (val) => __awaiter(void 0, void 0, void 0, function* () {
                        yield Resettings_1.Resettings.setSorting(states, val === null || val === void 0 ? void 0 : val[0]);
                    }),
                }),
                allowsMultiselect: false,
            }),
            App.createDUIInputField({
                id: 'search_suffix',
                label: 'Additional arguments',
                value: App.createDUIBinding({
                    get: () => Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.SearchSuffix),
                    set: (val) => __awaiter(void 0, void 0, void 0, function* () {
                        yield Resettings_1.Resettings.setSearchSuffix(states, val);
                    }),
                }),
            }),
        ];
    }),
});
exports.settingsSection = settingsSection;
const webSection = (states) => App.createDUISection({
    id: 'web',
    header: 'Web Requests',
    footer: 'Double search requests two pages per search. Enable this if your searches stops loading after 1 page.',
    isHidden: false,
    rows: () => __awaiter(void 0, void 0, void 0, function* () {
        return [
            (0, exports.storedSearchHistoryNavButton)(states),
            App.createDUISwitch({
                id: 'double_search',
                label: 'Double search (Slower)',
                value: App.createDUIBinding({
                    get: () => Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.DoubleSearch),
                    set: (val) => __awaiter(void 0, void 0, void 0, function* () {
                        yield Resettings_1.Resettings.set(states, Resettings_1.SettingKeys.DoubleSearch, val);
                    }),
                }),
            }),
            App.createDUISwitch({
                id: 'always_fallback',
                label: 'Always Fallback (Debug)',
                value: App.createDUIBinding({
                    get: () => Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.AlwaysFallback),
                    set: (val) => __awaiter(void 0, void 0, void 0, function* () {
                        yield Resettings_1.Resettings.set(states, Resettings_1.SettingKeys.AlwaysFallback, val);
                    }),
                }),
            }),
        ];
    }),
});
exports.webSection = webSection;
const dangerSection = (states) => App.createDUISection({
    id: 'danger',
    header: 'Danger Zone',
    footer: 'You might need to restart the app for some changes to apply visually.',
    isHidden: false,
    rows: () => __awaiter(void 0, void 0, void 0, function* () {
        return [
            (0, Resettings_1.resetSettings)(states),
        ];
    }),
});
exports.dangerSection = dangerSection;
const storedSearchHistoryNavButton = (states) => App.createDUINavigationButton({
    id: 'debug_settings_history',
    label: 'Search history',
    form: App.createDUIForm({
        sections: () => __awaiter(void 0, void 0, void 0, function* () {
            return Promise.all([
                (0, exports.clearSearchHistorySection)(states),
                (0, exports.storedSearchHistorySection)(states),
            ]);
        }),
    }),
});
exports.storedSearchHistoryNavButton = storedSearchHistoryNavButton;
const clearSearchHistorySection = (states) => __awaiter(void 0, void 0, void 0, function* () {
    return App.createDUISection({
        id: 'debug_settings_history_clear',
        header: 'Search History',
        footer: `Search history currently saves up to ${yield Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.CollectSearchesLimit)} entries.\n(You need to clear history after lowering the limit.)`,
        isHidden: false,
        rows: () => __awaiter(void 0, void 0, void 0, function* () {
            return [
                App.createDUISwitch({
                    id: 'search_history_toggle',
                    label: 'Enable Search Collection',
                    value: App.createDUIBinding({
                        get: () => Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.CollectSearches),
                        set: (val) => __awaiter(void 0, void 0, void 0, function* () {
                            yield Resettings_1.Resettings.set(states, Resettings_1.SettingKeys.CollectSearches, val);
                        }),
                    }),
                }),
                App.createDUIStepper({
                    id: 'search_history_limit',
                    label: 'Entry Limit',
                    min: 10,
                    max: 100,
                    step: 5,
                    value: App.createDUIBinding({
                        get: () => Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.CollectSearchesLimit),
                        set: (val) => __awaiter(void 0, void 0, void 0, function* () {
                            yield Resettings_1.Resettings.setLimit(states, val);
                        }),
                    }),
                }),
                App.createDUIButton({
                    id: 'debug_settings_clear_search_history',
                    label: 'Clear search history...',
                    onTap: () => __awaiter(void 0, void 0, void 0, function* () {
                        yield Resettings_1.Resettings.set(states, Resettings_1.SettingKeys.SearchHistory);
                    }),
                }),
            ];
        }),
    });
});
exports.clearSearchHistorySection = clearSearchHistorySection;
const storedSearchHistorySection = (states) => __awaiter(void 0, void 0, void 0, function* () {
    return App.createDUISection({
        id: 'debug_settings_history_data',
        header: 'Entries (Newest first' + ((yield Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.CollectSearches)) ? ')' : ' | Frozen)'),
        isHidden: false,
        rows: () => __awaiter(void 0, void 0, void 0, function* () {
            const entries = yield Resettings_1.Resettings.get(states, Resettings_1.SettingKeys.SearchHistory);
            if (entries.length <= 0) {
                return [App.createDUILabel({
                        id: 'debug_settings_history_empty',
                        label: 'Search history is empty.',
                    })];
            }
            return entries.map((entry, idx) => {
                return App.createDUIMultilineLabel({
                    id: `debug_settings_history_data[${idx}]`,
                    label: `Entry #${idx + 1}`,
                    value: stringifySearchEntry(entry),
                });
            });
        }),
    });
});
exports.storedSearchHistorySection = storedSearchHistorySection;
const dedent = (str, preserveEmpty = false) => str.replace(preserveEmpty ? /\n[^\S\r\n]*/g : /\n\s*/g, '\n');
const yesno = (bool) => (bool ? 'yes' : 'no');
const stringifySearchEntry = (entry) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return dedent(`
    Text: ${entry.text}
    Sort: ${(_a = entry.sort) !== null && _a !== void 0 ? _a : 'unknown'}
    Status: ${(_b = entry.status) !== null && _b !== void 0 ? _b : 'unknown'}
    CfChallenge: ${(_c = entry.challenged) !== null && _c !== void 0 ? _c : 'unknown'}
    Skipped: ${yesno((_d = entry.skipped) !== null && _d !== void 0 ? _d : false)}
    Stopped: ${yesno((_e = entry.stopped) !== null && _e !== void 0 ? _e : false)}
    Should stop: ${yesno((_f = entry.shouldStop) !== null && _f !== void 0 ? _f : false)}
    Reason: ${(_g = entry.reason) !== null && _g !== void 0 ? _g : '<none>'}
    Fallback: ${yesno((_h = entry.fallback) !== null && _h !== void 0 ? _h : false)}
    Next: ${(_j = entry.nextPage) !== null && _j !== void 0 ? _j : 'unknown'}
    Max: ${(_k = entry.maxPage) !== null && _k !== void 0 ? _k : 'unknown'}
    `.trim());
};

},{"../Data":62,"../Resettings":64,"../models":77}]},{},[63])(63)
});
