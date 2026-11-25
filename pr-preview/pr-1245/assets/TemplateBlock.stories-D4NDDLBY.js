import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{t}from"./react-BcdEFcws.js";import{n}from"./iframe-HKcXf9YQ.js";import{$i as r,Aa as i,An as a,At as o,C as s,Cn as c,Da as l,E as u,En as d,Er as f,Et as p,Fa as m,Ft as h,Gt as g,Hi as _,I as v,It as y,J as b,Jt as x,Kt as S,La as C,Lt as ee,Mt as w,Nt as T,Pt as te,Qi as ne,Ra as re,Rt as ie,Sn as ae,St as oe,T as se,Tn as ce,Ui as le,Xt as ue,Yt as de,_a as fe,_r as E,a as D,br as O,c as pe,ct as me,d as k,dn as he,fi as ge,fn as _e,g as ve,ga as ye,i as be,j as xe,ja as A,jr as Se,jt as Ce,ka as we,kt as j,l as Te,n as Ee,o as De,ot as Oe,pi as ke,pn as Ae,pr as M,pt as je,q as Me,qt as Ne,r as Pe,s as Fe,t as Ie,u as N,un as Le,va as Re,wa as ze}from"./StyleProvider-DO_2DQ3u.js";import{n as Be,t as Ve}from"./fondue-icons321-oXLUTN_b.js";import{a as He,c as Ue,l as We,n as Ge,s as Ke,t as qe}from"./ResponsiveImage-D93mTpz2.js";import{n as Je,t as Ye}from"./fondue-components37-DQHnsCy4.js";import{n as Xe,t as Ze}from"./useImageContainer-DMaAN2To.js";var Qe;function $e(){return($e=e((()=>{ye(),Qe=fe(`ArrowSync`,[[`path`,{fill:`currentColor`,"fill-rule":`evenodd`,d:`M13.54 6.221c-3.243-.869-6.234.952-7.116 4.243l-.01.036h2.8a.75.75 0 010 1.5H4V6.75a.75.75 0 011.5 0v1.9c1.503-3.15 4.846-4.837 8.429-3.877a7.6 7.6 0 013.395 1.932.75.75 0 11-1.056 1.065 6.1 6.1 0 00-2.727-1.549m-3.074 11.562c3.243.87 6.234-.951 7.116-4.243l.01-.036h-2.8a.75.75 0 010-1.5h5.214v5.25a.75.75 0 01-1.5 0v-1.9c-1.503 3.15-4.846 4.838-8.429 3.878a7.6 7.6 0 01-3.395-1.933.75.75 0 111.056-1.065 6.1 6.1 0 002.728 1.549`,"clip-rule":`evenodd`}]])})))()}var P;function et(){return(et=e((()=>{P=`template`})))()}var F,I,L,R,z,tt,nt,rt,it,at,ot,st,B,ct,lt,ut,V;function H(){return(H=e((()=>{N(),F=function(e){return e.None=`none`,e.Template=`template`,e.Custom=`custom`,e}({}),I=function(e){return e.Bottom=`bottom`,e.Top=`top`,e.Right=`right`,e.Left=`left`,e}({}),L=function(e){return e.Start=`start`,e.Center=`center`,e.End=`end`,e}({}),R=function(e){return e.OneQuarter=`25`,e.OneThird=`33.3333`,e.OneHalf=`50`,e.TwoThirds=`66.6666`,e.ThreeQuarters=`75`,e}({}),z=function(e){return e.Auto=`auto`,e.Small=`small`,e.Medium=`medium`,e.Large=`large`,e}({}),tt={bottom:`tw-flex-col`,top:`tw-flex-col-reverse`,right:`tw-flex-col @sm:tw-flex-row`,left:`tw-flex-col-reverse @sm:tw-flex-row-reverse`},nt={start:`lg:tw-items-start`,center:`lg:tw-items-center`,end:`lg:tw-items-end`},rt={start:`lg:tw-text-left`,center:`lg:tw-text-center`,end:`lg:tw-text-right`},it={start:`lg:tw-self-start`,center:`lg:tw-self-center`,end:`lg:tw-self-end`},at={25:`lg:tw-basis-1/4`,"33.3333":`lg:tw-basis-1/3`,50:`lg:tw-basis-1/2`,"66.6666":`lg:tw-basis-2/3`,75:`lg:tw-basis-3/4`},ot={25:`lg:tw-basis-3/4`,"33.3333":`lg:tw-basis-2/3`,50:`lg:tw-basis-1/2`,"66.6666":`lg:tw-basis-1/3`,75:`lg:tw-basis-1/4`},st={auto:`auto`,small:`240px`,medium:`480px`,large:`640px`},B=function(e){return e.Fit=`fit`,e.Fill=`fill`,e}({}),ct={fit:`tw-object-contain`,fill:`tw-object-cover`},lt={start:`left`,center:`center`,end:`right`},ut={[M.None]:`0px`,[M.Small]:`10px`,[M.Medium]:`20px`,[M.Large]:`30px`},V=function(e){return e.Simple=`simple`,e.Advanced=`advanced`,e}({})})))()}var U,W,dt;function ft(){return(ft=e((()=>{A(),N(),et(),H(),U={red:255,green:255,blue:255,alpha:0},W={red:234,green:235,blue:235,alpha:1},dt=k({main:[],basics:[{id:P,type:`templateInput`,label:`Template`,showForTranslations:!0},{id:`hasPageCount`,type:`switch`,defaultValue:!1,label:`Show page count`,info:`Show or hide the page count indicator`},{id:`preview`,type:`slider`,label:`Preview`,choices:[{label:`Template`,value:F.Template},{label:`Custom`,value:F.Custom},{label:`None`,value:F.None}],defaultValue:F.Template,showForTranslations:!0},{id:`previewCustom`,type:`assetInput`,size:`small`,extensions:C.Images,label:`Custom Preview`,show:e=>e.getBlock(`preview`)?.value===F.Custom,showForTranslations:!0},{id:`templateEditingHeading`,type:`sectionHeading`,blocks:[{id:`templateEditing`,label:`Template editing`,info:`Choose how users can make changes to the template.`,type:`slider`,choices:[{label:`Simple`,value:V.Simple},{label:`Advanced`,value:V.Advanced}],defaultValue:V.Advanced,showForTranslations:!0},{id:`templateEditingNotificationSimple`,type:`notification`,text:`Users can only make changes by selecting and editing fields in the settings panel without approvals.`,show:e=>e.getBlock(`templateEditing`)?.value===V.Simple,styles:{type:b.Info},showForTranslations:!0},{id:`templateEditingNotificationAdvanced`,type:`notification`,text:`Users can select layers and edit text directly.`,show:e=>e.getBlock(`templateEditing`)?.value===V.Advanced,styles:{type:b.Info},showForTranslations:!0}]}],layout:[{id:`cardLayoutHeading`,type:`sectionHeading`,label:`Card`,blocks:[ve({id:`blockCard`,paddingStyleMap:ut})]},{id:`textLayoutHeading`,type:`sectionHeading`,label:`Text`,show:e=>e.getBlock(`preview`)?.value!==F.None,blocks:[{id:`textPositioning`,label:`Positioning`,type:`slider`,defaultValue:I.Right,info:`Where the UI elements are in relation to one another. Some settings won't apply if the container is too narrow.`,choices:[{value:I.Bottom,icon:`MediaObjectTextBottom`},{value:I.Top,icon:`MediaObjectTextTop`},{value:I.Right,icon:`MediaObjectTextRight`},{value:I.Left,icon:`MediaObjectTextLeft`}]},{id:`textRatio`,label:`Ratio`,type:`slider`,defaultValue:R.OneHalf,info:`The text to image width ratio. Some settings won't apply if the container is too narrow.`,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===I.Right||t===I.Left},choices:[{value:R.OneQuarter,icon:`MediaObjectRatio3To1`},{value:R.OneThird,icon:`MediaObjectRatio2To1`},{value:R.OneHalf,icon:`MediaObjectRatio1To1`},{value:R.TwoThirds,icon:`MediaObjectRatio1To2`},{value:R.ThreeQuarters,icon:`MediaObjectRatio1To3`}]},{id:`textAnchoringVertical`,type:`slider`,label:`Vertical alignment`,defaultValue:L.Start,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===I.Right||t===I.Left},choices:[{value:L.Start,icon:`ArrowAlignUp`},{value:L.Center,icon:`ArrowAlignHorizontalCentre`},{value:L.End,icon:`ArrowAlignDown`}]},{id:`textAnchoringHorizontal`,type:`slider`,label:`Horizontal alignment`,defaultValue:L.Start,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===I.Top||t===I.Bottom},choices:[{value:L.Start,icon:`ArrowAlignLeft`},{value:L.Center,icon:`ArrowAlignVerticalCentre`},{value:L.End,icon:`ArrowAlignRight`}]}]},{id:`previewLayoutHeading`,type:`sectionHeading`,label:`Preview`,show:e=>e.getBlock(`preview`)?.value!==F.None,blocks:[{id:`isPreviewHeightCustom`,type:`switch`,label:`Height`,switchLabel:`Custom`,info:`Determines the preview height.`,defaultValue:!1,onChange:e=>{u(e,`previewHeightSimple`,`previewHeightCustom`,st)},on:[{id:`previewHeightCustom`,type:`input`,placeholder:`e.g. 50px`,clearable:!0,rules:[v,xe(10)],onChange:e=>{Me(e,`previewHeightCustom`)}}],off:[{id:`previewHeightSimple`,type:`slider`,defaultValue:z.Auto,choices:[{value:z.Auto,label:`Auto`},{value:z.Small,label:`S`},{value:z.Medium,label:`M`},{value:z.Large,label:`L`}]}]},{id:`previewDisplay`,type:`slider`,label:`Display`,defaultValue:B.Fit,show:e=>e.getBlock(`previewHeightSimple`)?.value!==z.Auto,choices:[{value:B.Fit,label:`Fit`},{value:B.Fill,label:`Fill`}]},{id:`previewImageAnchoring`,type:`slider`,label:`Image anchoring`,defaultValue:L.Center,show:e=>e.getBlock(`previewHeightSimple`)?.value!==z.Auto&&e.getBlock(`previewDisplay`)?.value===B.Fit,choices:[{value:L.Start,icon:`ArrowAlignLeft`},{value:L.Center,icon:`ArrowAlignVerticalCentre`},{value:L.End,icon:`ArrowAlignRight`}]}]}],style:[{id:`buttonStyleHeading`,type:`sectionHeading`,label:`Button`,blocks:[{id:`buttonStyle`,type:`dropdown`,size:`small`,defaultValue:`primary`,label:`Style`,choices:[{label:`Primary`,value:`primary`},{label:`Secondary`,value:`secondary`},{label:`Tertiary`,value:`tertiary`}]}]},{id:`cardStyleHeading`,type:`sectionHeading`,label:`Card`,blocks:[{...Oe({defaultValue:!0,defaultColor:U})},{...se({id:`blockCard`,defaultValue:!0,defaultColor:W})},{...s({id:`blockCard`}),show:e=>e.getBlock(`hasBackground`)?.value===!0||e.getBlock(`hasBorder_blockCard`)?.value===!0,onChange:e=>e.setBlockValue(`radiusValue_blockCard`,E[e.getBlock(`radiusChoice_blockCard`)?.value])}]},{id:`previewStyleHeading`,type:`sectionHeading`,label:`Preview`,show:e=>e.getBlock(`preview`)?.value!==F.None,blocks:[{...Oe({id:`TemplatePreview`,defaultValue:!0,defaultColor:U})},{...se({id:`templatePreview`,defaultValue:!0,defaultColor:W})},{...s({id:`templatePreview`}),onChange:e=>e.setBlockValue(`radiusValue_templatePreview`,E[e.getBlock(`radiusChoice_templatePreview`)?.value])}]}]})})))()}var pt,mt;function ht(){return(ht=e((()=>{pt=`template-block`,mt={scope:pt}})))()}var gt,_t;function vt(){return(vt=e((()=>{ne(),gt=n(),_t=({errorMessage:e})=>(0,gt.jsxs)(`span`,{"aria-live":`polite`,className:`tw-p-5 tw-flex tw-gap-4 tw-mb-4 tw-items-center tw-rounded-sm tw-transition-opacity tw-ease-in-out tw-bg-container-error tw-text-container-error-on-error-container`,children:[(0,gt.jsx)(`span`,{children:(0,gt.jsx)(r,{size:16})}),e]}),_t.__docgenInfo={description:``,methods:[],displayName:`AlertError`,props:{errorMessage:{required:!0,tsType:{name:`string`},description:``}}}})))()}var yt,bt,xt,St;function Ct(){return(Ct=e((()=>{ue(),N(),yt=t(),H(),bt=n(),xt=new de({noToolbar:!0}).setPlugin(),St=({blockSettings:e,isEditing:t,isDisabled:n,updateBlockSettings:r,handleNewPublication:i})=>{let[a,s]=(0,yt.useState)(!1),{buttonText:c,preview:l,buttonStyle:u}=e,f=(0,yt.useCallback)(e=>r({buttonText:e}),[r]),p=l===F.None?`!tw-m-0`:`!tw-mb-0`,m=(()=>{switch(u){case`primary`:return o.buttonPrimary;case`secondary`:return o.buttonSecondary;case`tertiary`:return o.buttonTertiary;default:return o.buttonPrimary}})();return(0,bt.jsx)(`button`,{type:`button`,"data-test-id":`cta-button`,disabled:n,onClick:t?void 0:i,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),className:`disabled:tw-opacity-50 ${p} [&>div]:!tw-@container-normal tw-max-w-full`,style:{...m,...a?m?.hover:null},children:(0,bt.jsx)(oe,{value:d(c)?c:ce(`p`,`Use this Template`),isEditing:t,plugins:xt,onTextChange:f})})},St.__docgenInfo={description:``,methods:[],displayName:`CtaButton`,props:{blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}},description:``},isEditing:{required:!0,tsType:{name:`boolean`},description:``},isDisabled:{required:!0,tsType:{name:`boolean`},description:``},updateBlockSettings:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(newSettings: Partial<Settings>) => Promise<void>`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},handleNewPublication:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var wt,G,Tt;function Et(){return(Et=e((()=>{A(),$e(),We(),_(),ae(),N(),Ke(),Ge(),Ze(),wt=t(),H(),G=n(),Tt=({appBridge:e,blockSettings:t,template:n,previewCustom:r,updateBlockSettings:i,onOpenTemplateChooser:o,handleDeleteCustomPreview:s})=>{let l=m(e),{preview:u,previewImageAnchoring:d,previewDisplay:f}=t,p=u===F.Custom&&r,h=p?r:n&&{previewUrl:n.previewUrl,genericUrl:n.previewUrl,originUrl:n.previewUrl,extension:``,width:null,height:null},{containerWidth:g,setContainerRef:_}=Xe(),v=t.altText??`Template preview`,y=c([`tw-relative tw-w-full tw-h-full`,ct[f]]),b={objectPosition:d?lt[d]:`center`},[x,S]=(0,wt.useState)(!1),[C,ee]=(0,wt.useState)(t.altText),[w,T]=(0,wt.useState)(!1);return(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`span`,{ref:_,className:`tw-block tw-w-full tw-h-full`,onMouseEnter:()=>T(!0),onMouseLeave:()=>T(!1),children:h&&(0,G.jsx)(qe,{image:h,containerWidth:g,alt:v,className:y,style:b,testId:`preview-img`})}),l&&(0,G.jsx)(`div`,{className:`tw-absolute tw-top-5 tw-right-0 tw-flex tw-justify-end tw-pt-3 tw-mx-3`,children:(0,G.jsx)(a,{shouldBeShown:w||x,toolbarItems:[{type:`menu`,items:(()=>{let e=[{title:`Set alt text`,onClick:()=>S(!0),icon:(0,G.jsx)(Ue,{size:20})},{title:`Replace template`,onClick:o,icon:(0,G.jsx)(Qe,{size:16})}];return p&&e.push({title:`Delete custom preview`,onClick:()=>s(r.id),style:`danger`,icon:(0,G.jsx)(le,{size:16})}),[e]})()}],children:(0,G.jsx)(He,{setShowAltTextMenu:S,showAltTextMenu:x,setLocalAltText:ee,defaultAltText:t.altText,onSave:()=>i({altText:C||void 0}),localAltText:C})})})]})},Tt.__docgenInfo={description:``,methods:[],displayName:`PreviewImage`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}},description:``},template:{required:!0,tsType:{name:`union`,raw:`Template | null`,elements:[{name:`Template`},{name:`null`}]},description:``},previewCustom:{required:!0,tsType:{name:`union`,raw:`Asset | null`,elements:[{name:`Asset`},{name:`null`}]},description:``},updateBlockSettings:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(newSettings: Partial<Settings>) => Promise<void>`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},onOpenTemplateChooser:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleDeleteCustomPreview:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(assetId: number) => void`,signature:{arguments:[{type:{name:`number`},name:`assetId`}],return:{name:`void`}}},description:``}}}})))()}var K,Dt;function Ot(){return(Ot=e((()=>{A(),Ve(),N(),ft(),H(),Et(),K=n(),Dt=({appBridge:e,blockSettings:t,template:n,previewCustom:r,previewClasses:i,updateBlockSettings:a,onOpenTemplateChooser:o,handleNewPublication:s,handleDeleteCustomPreview:c})=>{let l=m(e),{backgroundColorTemplatePreview:u,borderColor_templatePreview:d,borderStyle_templatePreview:p,borderWidth_templatePreview:h,hasBackgroundTemplatePreview:g,hasBorder_templatePreview:_,hasRadius_templatePreview:v,isPreviewHeightCustom:y,previewHeightCustom:b,previewHeightSimple:x,radiusChoice_templatePreview:S,radiusValue_templatePreview:C}=t,ee=v?C:E[S],w=_?`${h} ${p} ${f(d||W)}`:`none`,T=y?b:st[x],te=!l&&n!==null;return(0,K.jsx)(`div`,{className:i,"data-test-id":`preview`,children:n!==null||r?(0,K.jsx)(`button`,{type:`button`,className:`tw-relative tw-overflow-hidden tw-w-full tw-h-full`,"data-test-id":`preview-wrapper`,style:{...g&&{...O(u||U)},borderRadius:ee,border:w,height:T},onClick:s,disabled:!te,"aria-label":`Use this template`,children:(0,K.jsx)(Tt,{appBridge:e,blockSettings:t,template:n,previewCustom:r,updateBlockSettings:a,onOpenTemplateChooser:o,handleDeleteCustomPreview:c})}):(0,K.jsx)(`div`,{style:{height:st[z.Small]},children:(0,K.jsx)(Se,{label:`Choose existing template`,icon:(0,K.jsx)(Be,{}),withMenu:!1,fillParentContainer:!0,onClick:o})})})},Dt.__docgenInfo={description:``,methods:[],displayName:`TemplatePreview`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}},description:``},template:{required:!0,tsType:{name:`union`,raw:`Template | null`,elements:[{name:`Template`},{name:`null`}]},description:``},previewCustom:{required:!0,tsType:{name:`union`,raw:`Asset | null`,elements:[{name:`Asset`},{name:`null`}]},description:``},previewClasses:{required:!0,tsType:{name:`string`},description:``},updateBlockSettings:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(newSettings: Partial<Settings>) => Promise<void>`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},onOpenTemplateChooser:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleNewPublication:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleDeleteCustomPreview:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(assetId: number) => void`,signature:{arguments:[{type:{name:`number`},name:`assetId`}],return:{name:`void`}}},description:``}}}})))()}var q,J,kt;function At(){return(At=e((()=>{Ae(),he(),y(),ue(),x(),g(),w(),ee(),te(),N(),q=t(),J=n(),kt=({appBridge:e,updateBlockSettings:t,title:n,description:r,pageCount:i,isEditing:a,hasTitleOnly:s,templateTextKey:c})=>{let l=o[j.imageCaption],u=i===1?`page`:`pages`,f=(0,q.useCallback)(async e=>{n!==e&&await t({title:e})},[n,t]),m=(0,q.useCallback)(async e=>{r!==e&&await t({description:e})},[r,t]),g=(0,q.useMemo)(()=>new de().setPlugin([new S,new ie({textStyles:je})]).setPlugin([new Le,new h,new T,new Ce]).setPlugin([new Ne,new _e]),[]),_=(0,q.useMemo)(()=>me(e),[e]),v=(0,q.useMemo)(()=>(0,J.jsx)(oe,{value:n??ce(j.heading3),placeholder:`Add a title`,onTextChange:f,isEditing:a,showSerializedText:d(n),plugins:g},c),[g,a,f,n,c]),y=(0,q.useMemo)(()=>(0,J.jsx)(oe,{value:r,placeholder:`Add a description for your template`,onTextChange:m,showSerializedText:d(r),isEditing:a,plugins:_},c),[_,r,a,m,c]);return(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`div`,{"data-test-id":`title`,style:(()=>{let e={[`${p}heading1-margin-top`]:`0`,[`${p}heading2-margin-top`]:`0`,[`${p}heading3-margin-top`]:`0`,[`${p}heading4-margin-top`]:`0`,[`${p}custom1-margin-top`]:`0`,[`${p}custom2-margin-top`]:`0`,[`${p}custom3-margin-top`]:`0`,[`${p}body-margin-top`]:`0`,[`${p}quote-margin-top`]:`0`},t={[`${p}heading1-margin-bottom`]:`0`,[`${p}heading2-margin-bottom`]:`0`,[`${p}heading3-margin-bottom`]:`0`,[`${p}heading4-margin-bottom`]:`0`,[`${p}custom1-margin-bottom`]:`0`,[`${p}custom2-margin-bottom`]:`0`,[`${p}custom3-margin-bottom`]:`0`,[`${p}body-margin-bottom`]:`0`,[`${p}quote-margin-bottom`]:`0`};return s?{...e,...t}:e})(),children:v}),i!==void 0&&(0,J.jsx)(`div`,{className:`tw-mb-2`,"data-test-id":`page-count`,children:(0,J.jsx)(`span`,{style:{...l},children:`${i} ${u}`})}),(0,J.jsx)(`div`,{className:a||d(r)?`tw-mt-2`:``,"data-test-id":`description`,children:y})]})},kt.__docgenInfo={description:``,methods:[],displayName:`TemplateText`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},title:{required:!0,tsType:{name:`string`},description:``},description:{required:!0,tsType:{name:`string`},description:``},pageCount:{required:!0,tsType:{name:`union`,raw:`number | undefined`,elements:[{name:`number`},{name:`undefined`}]},description:``},isEditing:{required:!0,tsType:{name:`boolean`},description:``},hasTitleOnly:{required:!0,tsType:{name:`boolean`},description:``},templateTextKey:{required:!0,tsType:{name:`number`},description:``},updateBlockSettings:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(newSettings: Partial<Settings>) => Promise<void>`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``}}}})))()}var Y,jt,Mt,Nt,Pt,Ft,It,Lt;function Rt(){return(Rt=e((()=>{A(),N(),Y=t(),et(),ft(),H(),jt=e=>{let[t,n]=re(e),[r,a]=(0,Y.useState)(null),[o,s]=(0,Y.useState)(``),[c,u]=(0,Y.useState)(0),[f,p]=(0,Y.useState)(!1),h=(0,Y.useRef)(!1),g=m(e),{blockAssets:_,deleteAssetIdsFromKey:v}=we(e),{blockTemplates:y,updateTemplateIdsFromKey:b,error:x}=i(e),{backgroundColor:S,borderColor_blockCard:C,borderStyle_blockCard:ee,borderWidth_blockCard:w,description:T,hasBackground:te,hasBorder_blockCard:ne,hasCustomPaddingValue_blockCard:ie,hasPageCount:ae,hasRadius_blockCard:oe,paddingChoice_blockCard:se,paddingValue_blockCard:le,preview:ue,radiusChoice_blockCard:de,radiusValue_blockCard:fe,textAnchoringHorizontal:E,textAnchoringVertical:D,textPositioning:O,textRatio:pe,title:me}=t,k=ue!==F.None,he=!k&&!ae&&!d(T),ge=(0,Y.useCallback)(async t=>{if(!h.current){h.current=!0;try{await b(P,[t.template.id]),await n({title:ce(j.heading3,t.template.title),description:ce(j.p,t.template.description??void 0)}),u(c+1)}catch(e){s(e)}finally{h.current=!1,await e.dispatch(l())}}},[e,c,n,b]),_e=(0,Y.useCallback)(async e=>{await v(`previewCustom`,[e]),await n({preview:F.Template,altText:void 0})},[v,n]);return(0,Y.useEffect)(()=>{let t=e.subscribe(`templateChosen`,ge);return()=>{typeof t==`function`&&t()}},[e,ge]),(0,Y.useEffect)(()=>{x!==null&&s(x)},[x]),(0,Y.useEffect)(()=>{let e=y[P];if(!e||e.length===0)return;let t=e[e.length-1];t&&a(t)},[y]),(0,Y.useEffect)(()=>{let t=e.context(`isAuthenticated`).get();p(t)},[e]),{blockSettings:t,cardStyles:Lt(te,S||U,ie,le,se,oe,fe,de,ne,w,ee,C||W),contentClasses:Mt(k,O,D),ctaClasses:Nt(k,he,O,E),description:T,handleDeleteCustomPreview:_e,hasAuthenticatedUser:f,hasPreview:k,hasTitleOnly:he,isEditing:g,lastErrorMessage:o,preview:ue,previewClasses:Pt(k,O,pe),previewCustom:_.previewCustom?.length>0?_.previewCustom[0]:null,selectedTemplate:r,templateTextKey:c,textClasses:Ft(k,he,O,E),textCtaWrapperClasses:It(k,O,pe),title:me,updateBlockSettings:n}},Mt=(e,t,n)=>{let r=e&&[I.Right,I.Left].includes(t)?nt[n]:``;return`tw-flex tw-gap-x-6 tw-gap-y-4 ${tt[t]} ${r}`},Nt=(e,t,n,r)=>t?`tw-self-center`:e&&[I.Top,I.Bottom].includes(n)?it[r]:``,Pt=(e,t,n)=>`${e&&[I.Right,I.Left].includes(t)?ot[n]:``} tw-w-full`,Ft=(e,t,n,r)=>`tw-grow ${e&&[I.Top,I.Bottom].includes(n)?rt[r]:`tw-text-left`} ${t?`tw-self-center tw-w-full @sm:tw-w-auto`:``}`,It=(e,t,n)=>`tw-flex tw-grow tw-gap-y-2 tw-gap-x-8 ${e?`tw-flex-col`:`tw-flex-col @sm:tw-flex-row`} ${e&&[I.Right,I.Left].includes(t)?at[n]:``}`,Lt=(e,t,n,r,i,a,o,s,c,l,u,d)=>({...e&&O(t),padding:n?r:ut[i],borderRadius:a?o:E[s],border:c?`${l} ${u} ${f(d)}`:`none`})})))()}var X,zt;function Bt(){return(Bt=e((()=>{A(),Ye(),ge(),Ee(),ht(),vt(),Ct(),Ot(),At(),Rt(),H(),X=n(),zt=({appBridge:e})=>{let{blockSettings:t,cardStyles:n,contentClasses:r,ctaClasses:i,description:a,handleDeleteCustomPreview:o,hasAuthenticatedUser:s,hasPreview:c,hasTitleOnly:l,isEditing:u,lastErrorMessage:d,preview:f,previewClasses:p,previewCustom:m,selectedTemplate:h,templateTextKey:g,textClasses:_,textCtaWrapperClasses:v,title:y,updateBlockSettings:b}=jt(e),x=async()=>{if(!h)return;let{templateEditing:n}=t;if(n===V.Simple)open(h.creationFormUri,`_self`);else{let t=f===F.Custom&&m?m.previewUrl:h.previewUrl,n={template:{...h,previewUrl:t}};await e.dispatch(Re(n))}},S=()=>e.dispatch(ze());return!u&&(!h||!s)?(0,X.jsx)(`div`,{"data-test-id":`container`,className:mt.scope}):(0,X.jsx)(Ie,{scope:mt.scope,children:(0,X.jsx)(`div`,{"data-test-id":`container`,className:`tw-@container`,children:(0,X.jsxs)(`div`,{"data-test-id":`card`,style:n,children:[u&&d!==``&&(0,X.jsx)(_t,{errorMessage:d}),(0,X.jsxs)(`div`,{"data-test-id":`content`,className:r,children:[c&&(0,X.jsx)(Dt,{appBridge:e,blockSettings:t,template:h,previewCustom:m,previewClasses:p,updateBlockSettings:b,onOpenTemplateChooser:S,handleNewPublication:x,handleDeleteCustomPreview:o}),(0,X.jsxs)(`div`,{"data-test-id":`text-cta-wrapper`,className:v,children:[(0,X.jsx)(`div`,{"data-test-id":`text`,className:_,children:(0,X.jsx)(kt,{appBridge:e,updateBlockSettings:b,title:y,description:a,pageCount:t.hasPageCount===!1?void 0:h?.pages.length??0,isEditing:u,hasTitleOnly:l,templateTextKey:g})}),(0,X.jsx)(`div`,{"data-test-id":`cta`,className:i,children:(0,X.jsx)(St,{blockSettings:t,isEditing:u,isDisabled:!h,updateBlockSettings:b,handleNewPublication:x})})]})]}),u&&!c&&(0,X.jsxs)(`div`,{"data-test-id":`cta-editing-no-preview`,className:`tw-flex tw-justify-between tw-items-center tw-mt-4 tw-p-3 tw-pl-4 tw-bg-black-0 tw-border tw-border-container-secondary tw-rounded-medium tw-flex-col @sm:tw-flex-row`,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(Je,{size:`large`,color:`weak`,children:`Connected template: `}),(0,X.jsx)(Je,{size:`large`,children:h?.name??`None`})]}),(0,X.jsx)(ke,{className:`tw-line-clamp-2`,emphasis:h?`default`:`strong`,onPress:S,children:h?`Replace template`:`Choose existing template`})]})]})})})},zt.__docgenInfo={description:``,methods:[],displayName:`TemplateBlock`}})))()}var Vt;function Ht(){return(Ht=e((()=>{N(),ft(),Bt(),Vt=Te({block:zt,settings:dt})})))()}var Ut,Z,Wt,Gt,Q,$,Kt,qt,Jt,Yt,Xt,Zt,Qt;function $t(){return($t=e((()=>{pe(),De(),be(),et(),H(),Ht(),Ut={title:`Blocks/Template`,...Pe(Vt)},Z=D.image(0),Wt=D.image(5),Gt={...Fe.with(7001),name:`Social media announcement`,description:`A 1080 × 1080 post with headline, image and logo lockup.`,previewUrl:Z.previewUrl,pages:[{previewUrl:Z.previewUrl,width:Z.width??0,height:Z.height??0},{previewUrl:Wt.previewUrl,width:Wt.width??0,height:Wt.height??0}]},Q=JSON.stringify([{type:`heading3`,children:[{text:`Social media announcement`}]}]),$=JSON.stringify([{type:`p`,children:[{text:`Start from the approved layout and swap in your own headline and photo.`}]}]),Kt={appBridge:{blockTemplates:{[P]:[Gt]}}},qt={},Jt={args:{title:Q,description:$},parameters:Kt},Yt={args:{title:Q,description:$,textPositioning:I.Bottom,hasPageCount:!0},parameters:Kt},Xt={args:{title:Q,description:$,preview:F.Custom},parameters:{appBridge:{blockTemplates:{[P]:[Gt]},blockAssets:{previewCustom:[D.image(3)]}}}},Zt={args:{title:Q,description:$,preview:F.None},parameters:Kt},Qt=[`Empty`,`WithTemplate`,`TextBelowWithPageCount`,`CustomPreview`,`WithoutPreview`]})))()}$t();export{Xt as CustomPreview,qt as Empty,Yt as TextBelowWithPageCount,Jt as WithTemplate,Zt as WithoutPreview,Qt as __namedExportsOrder,Ut as default};