import{n as e,r as t}from"./rolldown-runtime-C0FnF6B9.js";import{t as n}from"./react-IpA8Qn9U.js";import{n as r}from"./iframe-ctpc8pAY.js";import{$r as i,Cr as a,Ct as o,Ft as s,Gr as c,Hr as l,Pt as u,Qr as d,Sr as f,Xn as p,Xr as m,Zn as h,a as g,b as _,c as v,d as y,dn as b,ei as x,i as S,ii as C,l as w,n as ee,ni as T,o as te,on as ne,r as re,s as ie,sn as ae,t as oe,u as E,un as se,wt as ce,x as le}from"./StyleProvider-CX0kt2Fa.js";import{B as ue,C as de,G as fe,H as pe,Ht as me,J as he,K as D,Kt as ge,L as _e,R as O,U as ve,Ut as ye,V as be,W as xe,X as Se,Y as Ce,_ as we,q as Te,qt as Ee,t as De,w as k,z as Oe}from"./helpers.es-DJXSOpWh.js";import{p as ke,t as Ae}from"./BlockItemWrapper.es-DCeb2cVo.js";import{n as je}from"./toRgbaString.es-DiurEra-.js";import{n as Me}from"./getBackgroundColorStyles.es-C5c8xKfb.js";import{a as Ne,c as Pe,i as A,t as Fe}from"./types.es-CXpHWNfM.js";import{a as Ie,i as Le,n as Re}from"./border.es-CTTLYVkJ.js";import{t as j}from"./hasRichTextValue.es-BRfuSM7o.js";import{n as M}from"./convertToRichTextValue.es-BmsTS-lT.js";import{n as ze,t as Be}from"./merge.es-U-w69n1D.js";import{t as N}from"./constants.es-k8JHI1Hx.js";import{n as Ve}from"./defaultPluginsWithLinkChooser.es-CzgWESGt.js";import{n as He}from"./background.es-BWUGk8pA.js";import{t as Ue}from"./notification.es-BjXNTZ02.js";import{a as We,i as Ge,n as Ke,o as qe,r as Je,t as Ye}from"./presetCustomValue.es-LpTSp2Lg.js";import{n as Xe,t as Ze}from"./maximumNumericalOrPixelOrAutoRule.es-CO0y4bft.js";import{n as Qe}from"./minimumNumericalOrPixelOrAutoRule.es-Cg8fUaMa.js";import{r as $e}from"./borderRadius.es-CzT9xuYW.js";import{i as et,l as tt,n as nt,r as rt,s as it,t as at}from"./useImageContainer-CjCyho14.js";var ot,st;function ct(){return(ct=e((()=>{Le(),Ne(),We(),Ze(),Ge(),Ke(),ot=e=>({id:e,type:`segmentedControls`,defaultValue:A.Small,choices:[{value:A.None,label:`None`},{value:A.Small,label:`S`},{value:A.Medium,label:`M`},{value:A.Large,label:`L`}]}),st=e=>{let t=e?.id?`hasCustomPaddingValue_${e?.id}`:`hasCustomPaddingValue`,n=e?.id?`paddingValue_${e?.id}`:`paddingValue`,r=e?.id?`paddingChoice_${e?.id}`:`paddingChoice`;return{id:t,label:`Padding`,type:`switch`,switchLabel:`Custom`,defaultValue:!1,info:`The spacing around UI elements to create more negative space`,onChange:t=>Ye(t,r,n,e?.paddingStyleMap||Fe),on:[{id:n,type:`input`,placeholder:Ie,rules:[Je,Xe(500)],onChange:e=>qe(e,n)}],off:[ot(r)]}}})))()}var P;function lt(){return(lt=e((()=>{P=`template`})))()}var F,I,L,R,z,ut,dt,ft,pt,mt,ht,gt,B,_t,vt,yt,V;function H(){return(H=e((()=>{E(),F=function(e){return e.None=`none`,e.Template=`template`,e.Custom=`custom`,e}({}),I=function(e){return e.Bottom=`bottom`,e.Top=`top`,e.Right=`right`,e.Left=`left`,e}({}),L=function(e){return e.Start=`start`,e.Center=`center`,e.End=`end`,e}({}),R=function(e){return e.OneQuarter=`25`,e.OneThird=`33.3333`,e.OneHalf=`50`,e.TwoThirds=`66.6666`,e.ThreeQuarters=`75`,e}({}),z=function(e){return e.Auto=`auto`,e.Small=`small`,e.Medium=`medium`,e.Large=`large`,e}({}),ut={bottom:`tw-flex-col`,top:`tw-flex-col-reverse`,right:`tw-flex-col @sm:tw-flex-row`,left:`tw-flex-col-reverse @sm:tw-flex-row-reverse`},dt={start:`lg:tw-items-start`,center:`lg:tw-items-center`,end:`lg:tw-items-end`},ft={start:`lg:tw-text-left`,center:`lg:tw-text-center`,end:`lg:tw-text-right`},pt={start:`lg:tw-self-start`,center:`lg:tw-self-center`,end:`lg:tw-self-end`},mt={25:`lg:tw-basis-1/4`,"33.3333":`lg:tw-basis-1/3`,50:`lg:tw-basis-1/2`,"66.6666":`lg:tw-basis-2/3`,75:`lg:tw-basis-3/4`},ht={25:`lg:tw-basis-3/4`,"33.3333":`lg:tw-basis-2/3`,50:`lg:tw-basis-1/2`,"66.6666":`lg:tw-basis-1/3`,75:`lg:tw-basis-1/4`},gt={auto:`auto`,small:`240px`,medium:`480px`,large:`640px`},B=function(e){return e.Fit=`fit`,e.Fill=`fill`,e}({}),_t={fit:`tw-object-contain`,fill:`tw-object-cover`},vt={start:`left`,center:`center`,end:`right`},yt={[A.None]:`0px`,[A.Small]:`10px`,[A.Medium]:`20px`,[A.Large]:`30px`},V=function(e){return e.Simple=`simple`,e.Advanced=`advanced`,e}({})})))()}var U,W,bt;function xt(){return(xt=e((()=>{m(),E(),lt(),H(),U={red:255,green:255,blue:255,alpha:0},W={red:234,green:235,blue:235,alpha:1},bt=y({main:[],basics:[{id:P,type:`templateInput`,label:`Template`,showForTranslations:!0},{id:`hasPageCount`,type:`switch`,defaultValue:!1,label:`Show page count`,info:`Show or hide the page count indicator`},{id:`preview`,type:`slider`,label:`Preview`,choices:[{label:`Template`,value:F.Template},{label:`Custom`,value:F.Custom},{label:`None`,value:F.None}],defaultValue:F.Template,showForTranslations:!0},{id:`previewCustom`,type:`assetInput`,size:`small`,extensions:T.Images,label:`Custom Preview`,show:e=>e.getBlock(`preview`)?.value===F.Custom,showForTranslations:!0},{id:`templateEditingHeading`,type:`sectionHeading`,blocks:[{id:`templateEditing`,label:`Template editing`,info:`Choose how users can make changes to the template.`,type:`slider`,choices:[{label:`Simple`,value:V.Simple},{label:`Advanced`,value:V.Advanced}],defaultValue:V.Advanced,showForTranslations:!0},{id:`templateEditingNotificationSimple`,type:`notification`,text:`Users can only make changes by selecting and editing fields in the settings panel without approvals.`,show:e=>e.getBlock(`templateEditing`)?.value===V.Simple,styles:{type:Ue.Info},showForTranslations:!0},{id:`templateEditingNotificationAdvanced`,type:`notification`,text:`Users can select layers and edit text directly.`,show:e=>e.getBlock(`templateEditing`)?.value===V.Advanced,styles:{type:Ue.Info},showForTranslations:!0}]}],layout:[{id:`cardLayoutHeading`,type:`sectionHeading`,label:`Card`,blocks:[st({id:`blockCard`,paddingStyleMap:yt})]},{id:`textLayoutHeading`,type:`sectionHeading`,label:`Text`,show:e=>e.getBlock(`preview`)?.value!==F.None,blocks:[{id:`textPositioning`,label:`Positioning`,type:`slider`,defaultValue:I.Right,info:`Where the UI elements are in relation to one another. Some settings won't apply if the container is too narrow.`,choices:[{value:I.Bottom,icon:`MediaObjectTextBottom`},{value:I.Top,icon:`MediaObjectTextTop`},{value:I.Right,icon:`MediaObjectTextRight`},{value:I.Left,icon:`MediaObjectTextLeft`}]},{id:`textRatio`,label:`Ratio`,type:`slider`,defaultValue:R.OneHalf,info:`The text to image width ratio. Some settings won't apply if the container is too narrow.`,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===I.Right||t===I.Left},choices:[{value:R.OneQuarter,icon:`MediaObjectRatio3To1`},{value:R.OneThird,icon:`MediaObjectRatio2To1`},{value:R.OneHalf,icon:`MediaObjectRatio1To1`},{value:R.TwoThirds,icon:`MediaObjectRatio1To2`},{value:R.ThreeQuarters,icon:`MediaObjectRatio1To3`}]},{id:`textAnchoringVertical`,type:`slider`,label:`Vertical alignment`,defaultValue:L.Start,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===I.Right||t===I.Left},choices:[{value:L.Start,icon:`ArrowAlignUp`},{value:L.Center,icon:`ArrowAlignHorizontalCentre`},{value:L.End,icon:`ArrowAlignDown`}]},{id:`textAnchoringHorizontal`,type:`slider`,label:`Horizontal alignment`,defaultValue:L.Start,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===I.Top||t===I.Bottom},choices:[{value:L.Start,icon:`ArrowAlignLeft`},{value:L.Center,icon:`ArrowAlignVerticalCentre`},{value:L.End,icon:`ArrowAlignRight`}]}]},{id:`previewLayoutHeading`,type:`sectionHeading`,label:`Preview`,show:e=>e.getBlock(`preview`)?.value!==F.None,blocks:[{id:`isPreviewHeightCustom`,type:`switch`,label:`Height`,switchLabel:`Custom`,info:`Determines the preview height.`,defaultValue:!1,onChange:e=>{Ye(e,`previewHeightSimple`,`previewHeightCustom`,gt)},on:[{id:`previewHeightCustom`,type:`input`,placeholder:`e.g. 50px`,clearable:!0,rules:[Je,Qe(10)],onChange:e=>{qe(e,`previewHeightCustom`)}}],off:[{id:`previewHeightSimple`,type:`slider`,defaultValue:z.Auto,choices:[{value:z.Auto,label:`Auto`},{value:z.Small,label:`S`},{value:z.Medium,label:`M`},{value:z.Large,label:`L`}]}]},{id:`previewDisplay`,type:`slider`,label:`Display`,defaultValue:B.Fit,show:e=>e.getBlock(`previewHeightSimple`)?.value!==z.Auto,choices:[{value:B.Fit,label:`Fit`},{value:B.Fill,label:`Fill`}]},{id:`previewImageAnchoring`,type:`slider`,label:`Image anchoring`,defaultValue:L.Center,show:e=>e.getBlock(`previewHeightSimple`)?.value!==z.Auto&&e.getBlock(`previewDisplay`)?.value===B.Fit,choices:[{value:L.Start,icon:`ArrowAlignLeft`},{value:L.Center,icon:`ArrowAlignVerticalCentre`},{value:L.End,icon:`ArrowAlignRight`}]}]}],style:[{id:`buttonStyleHeading`,type:`sectionHeading`,label:`Button`,blocks:[{id:`buttonStyle`,type:`dropdown`,size:`small`,defaultValue:`primary`,label:`Style`,choices:[{label:`Primary`,value:`primary`},{label:`Secondary`,value:`secondary`},{label:`Tertiary`,value:`tertiary`}]}]},{id:`cardStyleHeading`,type:`sectionHeading`,label:`Card`,blocks:[{...He({defaultValue:!0,defaultColor:U})},{...Re({id:`blockCard`,defaultValue:!0,defaultColor:W})},{...$e({id:`blockCard`}),show:e=>e.getBlock(`hasBackground`)?.value===!0||e.getBlock(`hasBorder_blockCard`)?.value===!0,onChange:e=>e.setBlockValue(`radiusValue_blockCard`,Pe[e.getBlock(`radiusChoice_blockCard`)?.value])}]},{id:`previewStyleHeading`,type:`sectionHeading`,label:`Preview`,show:e=>e.getBlock(`preview`)?.value!==F.None,blocks:[{...He({id:`TemplatePreview`,defaultValue:!0,defaultColor:U})},{...Re({id:`templatePreview`,defaultValue:!0,defaultColor:W})},{...$e({id:`templatePreview`}),onChange:e=>e.setBlockValue(`radiusValue_templatePreview`,Pe[e.getBlock(`radiusChoice_templatePreview`)?.value])}]}]})})))()}var St,Ct;function wt(){return(wt=e((()=>{St=`template-block`,Ct={scope:St}})))()}var Tt,Et;function Dt(){return(Dt=e((()=>{p(),Tt=r(),Et=({errorMessage:e})=>(0,Tt.jsxs)(`span`,{"aria-live":`polite`,className:`tw-p-5 tw-flex tw-gap-4 tw-mb-4 tw-items-center tw-rounded-sm tw-transition-opacity tw-ease-in-out tw-bg-container-error tw-text-container-error-on-error-container`,children:[(0,Tt.jsx)(`span`,{children:(0,Tt.jsx)(h,{size:16})}),e]}),Et.__docgenInfo={description:``,methods:[],displayName:`AlertError`,props:{errorMessage:{required:!0,tsType:{name:`string`},description:``}}}})))()}var Ot,kt,At,jt;function Mt(){return(Mt=e((()=>{Se(),E(),Ot=n(),H(),kt=r(),At=new Ce({noToolbar:!0}).setPlugin(),jt=({blockSettings:e,isEditing:t,isDisabled:n,updateBlockSettings:r,handleNewPublication:i})=>{let[a,o]=(0,Ot.useState)(!1),{buttonText:s,preview:c,buttonStyle:l}=e,u=(0,Ot.useCallback)(e=>r({buttonText:e}),[r]),d=c===F.None?`!tw-m-0`:`!tw-mb-0`,f=(()=>{switch(l){case`primary`:return k.buttonPrimary;case`secondary`:return k.buttonSecondary;case`tertiary`:return k.buttonTertiary;default:return k.buttonPrimary}})();return(0,kt.jsx)(`button`,{type:`button`,"data-test-id":`cta-button`,disabled:n,onClick:t?void 0:i,onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),className:`disabled:tw-opacity-50 ${d} [&>div]:!tw-@container-normal tw-max-w-full`,style:{...f,...a?f?.hover:null},children:(0,kt.jsx)(we,{value:j(s)?s:M(`p`,`Use this Template`),isEditing:t,plugins:At,onTextChange:u})})},jt.__docgenInfo={description:``,methods:[],displayName:`CtaButton`,props:{blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},handleNewPublication:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var Nt,G,Pt;function Ft(){return(Ft=e((()=>{m(),a(),ae(),u(),Be(),E(),tt(),et(),at(),Nt=n(),H(),G=r(),Pt=({appBridge:e,blockSettings:t,template:n,previewCustom:r,updateBlockSettings:a,onOpenTemplateChooser:o,handleDeleteCustomPreview:c})=>{let l=i(e),{preview:u,previewImageAnchoring:d,previewDisplay:p}=t,m=u===F.Custom&&r,h=m?r:n&&{previewUrl:n.previewUrl,genericUrl:n.previewUrl,originUrl:n.previewUrl,extension:``,width:null,height:null},{containerWidth:g,setContainerRef:_}=nt(),v=t.altText??`Template preview`,y=ze([`tw-relative tw-w-full tw-h-full`,_t[p]]),b={objectPosition:d?vt[d]:`center`},[x,S]=(0,Nt.useState)(!1),[C,w]=(0,Nt.useState)(t.altText),[ee,T]=(0,Nt.useState)(!1);return(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`span`,{ref:_,className:`tw-block tw-w-full tw-h-full`,onMouseEnter:()=>T(!0),onMouseLeave:()=>T(!1),children:h&&(0,G.jsx)(rt,{image:h,containerWidth:g,alt:v,className:y,style:b,testId:`preview-img`})}),l&&(0,G.jsx)(`div`,{className:`tw-absolute tw-top-5 tw-right-0 tw-flex tw-justify-end tw-pt-3 tw-mx-3`,children:(0,G.jsx)(Ae,{shouldBeShown:ee||x,toolbarItems:[{type:`menu`,items:(()=>{let e=[{title:`Set alt text`,onClick:()=>S(!0),icon:(0,G.jsx)(ne,{size:20})},{title:`Replace template`,onClick:o,icon:(0,G.jsx)(f,{size:16})}];return m&&e.push({title:`Delete custom preview`,onClick:()=>c(r.id),style:`danger`,icon:(0,G.jsx)(s,{size:16})}),[e]})()}],children:(0,G.jsx)(it,{setShowAltTextMenu:S,showAltTextMenu:x,setLocalAltText:w,defaultAltText:t.altText,onSave:()=>a({altText:C||void 0}),localAltText:C})})})]})},Pt.__docgenInfo={description:``,methods:[],displayName:`PreviewImage`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},onOpenTemplateChooser:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleDeleteCustomPreview:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(assetId: number) => void`,signature:{arguments:[{type:{name:`number`},name:`assetId`}],return:{name:`void`}}},description:``}}}})))()}var K,It;function Lt(){return(Lt=e((()=>{m(),se(),E(),xt(),H(),Ft(),K=r(),It=({appBridge:e,blockSettings:t,template:n,previewCustom:r,previewClasses:a,updateBlockSettings:o,onOpenTemplateChooser:s,handleNewPublication:c,handleDeleteCustomPreview:l})=>{let u=i(e),{backgroundColorTemplatePreview:d,borderColor_templatePreview:f,borderStyle_templatePreview:p,borderWidth_templatePreview:m,hasBackgroundTemplatePreview:h,hasBorder_templatePreview:g,hasRadius_templatePreview:_,isPreviewHeightCustom:v,previewHeightCustom:y,previewHeightSimple:x,radiusChoice_templatePreview:S,radiusValue_templatePreview:C}=t,w=_?C:Pe[S],ee=g?`${m} ${p} ${je(f||W)}`:`none`,T=v?y:gt[x],te=!u&&n!==null;return(0,K.jsx)(`div`,{className:a,"data-test-id":`preview`,children:n!==null||r?(0,K.jsx)(`button`,{type:`button`,className:`tw-relative tw-overflow-hidden tw-w-full tw-h-full`,"data-test-id":`preview-wrapper`,style:{...h&&{...Me(d||U)},borderRadius:w,border:ee,height:T},onClick:c,disabled:!te,"aria-label":`Use this template`,children:(0,K.jsx)(Pt,{appBridge:e,blockSettings:t,template:n,previewCustom:r,updateBlockSettings:o,onOpenTemplateChooser:s,handleDeleteCustomPreview:l})}):(0,K.jsx)(`div`,{style:{height:gt[z.Small]},children:(0,K.jsx)(ke,{label:`Choose existing template`,icon:(0,K.jsx)(b,{}),withMenu:!1,fillParentContainer:!0,onClick:s})})})},It.__docgenInfo={description:``,methods:[],displayName:`TemplatePreview`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},onOpenTemplateChooser:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleNewPublication:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleDeleteCustomPreview:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(assetId: number) => void`,signature:{arguments:[{type:{name:`number`},name:`assetId`}],return:{name:`void`}}},description:``}}}})))()}var q,J,Rt;function zt(){return(zt=e((()=>{Ee(),ye(),pe(),Se(),he(),fe(),O(),ve(),ue(),E(),q=n(),J=r(),Rt=({appBridge:e,updateBlockSettings:t,title:n,description:r,pageCount:i,isEditing:a,hasTitleOnly:o,templateTextKey:s})=>{let c=k[de.imageCaption],l=i===1?`page`:`pages`,u=(0,q.useCallback)(async e=>{n!==e&&await t({title:e})},[n,t]),d=(0,q.useCallback)(async e=>{r!==e&&await t({description:e})},[r,t]),f=(0,q.useMemo)(()=>new Ce().setPlugin([new D,new xe({textStyles:De})]).setPlugin([new me,new be,new Oe,new _e]).setPlugin([new Te,new ge]),[]),p=(0,q.useMemo)(()=>Ve(e),[e]),m=(0,q.useMemo)(()=>(0,J.jsx)(we,{value:n??M(de.heading3),placeholder:`Add a title`,onTextChange:u,isEditing:a,showSerializedText:j(n),plugins:f},s),[f,a,u,n,s]),h=(0,q.useMemo)(()=>(0,J.jsx)(we,{value:r,placeholder:`Add a description for your template`,onTextChange:d,showSerializedText:j(r),isEditing:a,plugins:p},s),[p,r,a,d,s]);return(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`div`,{"data-test-id":`title`,style:(()=>{let e={[`${N}heading1-margin-top`]:`0`,[`${N}heading2-margin-top`]:`0`,[`${N}heading3-margin-top`]:`0`,[`${N}heading4-margin-top`]:`0`,[`${N}custom1-margin-top`]:`0`,[`${N}custom2-margin-top`]:`0`,[`${N}custom3-margin-top`]:`0`,[`${N}body-margin-top`]:`0`,[`${N}quote-margin-top`]:`0`},t={[`${N}heading1-margin-bottom`]:`0`,[`${N}heading2-margin-bottom`]:`0`,[`${N}heading3-margin-bottom`]:`0`,[`${N}heading4-margin-bottom`]:`0`,[`${N}custom1-margin-bottom`]:`0`,[`${N}custom2-margin-bottom`]:`0`,[`${N}custom3-margin-bottom`]:`0`,[`${N}body-margin-bottom`]:`0`,[`${N}quote-margin-bottom`]:`0`};return o?{...e,...t}:e})(),children:m}),i!==void 0&&(0,J.jsx)(`div`,{className:`tw-mb-2`,"data-test-id":`page-count`,children:(0,J.jsx)(`span`,{style:{...c},children:`${i} ${l}`})}),(0,J.jsx)(`div`,{className:a||j(r)?`tw-mt-2`:``,"data-test-id":`description`,children:h})]})},Rt.__docgenInfo={description:``,methods:[],displayName:`TemplateText`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},title:{required:!0,tsType:{name:`string`},description:``},description:{required:!0,tsType:{name:`string`},description:``},pageCount:{required:!0,tsType:{name:`union`,raw:`number | undefined`,elements:[{name:`number`},{name:`undefined`}]},description:``},isEditing:{required:!0,tsType:{name:`boolean`},description:``},hasTitleOnly:{required:!0,tsType:{name:`boolean`},description:``},templateTextKey:{required:!0,tsType:{name:`number`},description:``},updateBlockSettings:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(newSettings: Partial<Settings>) => Promise<void>`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``}}}})))()}var Y,Bt,Vt,Ht,Ut,Wt,Gt,Kt;function qt(){return(qt=e((()=>{m(),E(),Y=n(),lt(),xt(),H(),Bt=e=>{let[t,n]=x(e),[r,a]=(0,Y.useState)(``),[o,s]=(0,Y.useState)(0),[l,u]=(0,Y.useState)(!1),f=(0,Y.useRef)(void 0),p=i(e),{openTemplateChooser:m,closeTemplateChooser:h}=d(e),{blockAssets:g,deleteAssetIdsFromKey:_}=C(e),{blockTemplates:v,updateTemplateIdsFromKey:y,error:b}=c(e),S=v[P],w=S?.[S.length-1]??null,{backgroundColor:ee,borderColor_blockCard:T,borderStyle_blockCard:te,borderWidth_blockCard:ne,description:re,hasBackground:ie,hasBorder_blockCard:ae,hasCustomPaddingValue_blockCard:oe,hasPageCount:E,hasRadius_blockCard:se,paddingChoice_blockCard:ce,paddingValue_blockCard:le,preview:ue,radiusChoice_blockCard:fe,radiusValue_blockCard:pe,textAnchoringHorizontal:me,textAnchoringVertical:he,textPositioning:D,textRatio:ge,title:_e}=t,O=ue!==F.None,ve=!O&&!E&&!j(re),ye=(0,Y.useCallback)(()=>m(e=>{h(),y(P,[e.id]).catch(console.error)}),[m,h,y]),be=(0,Y.useCallback)(async e=>{try{await n({title:M(de.heading3,e.name),description:M(de.p,e.description)}),s(e=>e+1)}catch(e){a(e instanceof Error?e.message:String(e))}},[n]),xe=(0,Y.useCallback)(async e=>{await _(`previewCustom`,[e]),await n({preview:F.Template,altText:void 0})},[_,n]);return(0,Y.useEffect)(()=>{b!==null&&a(b)},[b]),(0,Y.useEffect)(()=>{if(e.context(`templates`).get()===void 0)return;let t=f.current;f.current=w?.id??null,p&&t!==void 0&&w!==null&&t!==w.id&&be(w).catch(console.error)},[e,w,p,be]),(0,Y.useEffect)(()=>{let t=e.context(`isAuthenticated`).get();u(t)},[e]),{blockSettings:t,cardStyles:Kt(ie,ee||U,oe,le,ce,se,pe,fe,ae,ne,te,T||W),contentClasses:Vt(O,D,he),ctaClasses:Ht(O,ve,D,me),description:re,handleDeleteCustomPreview:xe,handleOpenTemplateChooser:ye,hasAuthenticatedUser:l,hasPreview:O,hasTitleOnly:ve,isEditing:p,lastErrorMessage:r,preview:ue,previewClasses:Ut(O,D,ge),previewCustom:g.previewCustom?.length>0?g.previewCustom[0]:null,selectedTemplate:w,templateTextKey:o,textClasses:Wt(O,ve,D,me),textCtaWrapperClasses:Gt(O,D,ge),title:_e,updateBlockSettings:n}},Vt=(e,t,n)=>{let r=e&&[I.Right,I.Left].includes(t)?dt[n]:``;return`tw-flex tw-gap-x-6 tw-gap-y-4 ${ut[t]} ${r}`},Ht=(e,t,n,r)=>t?`tw-self-center`:e&&[I.Top,I.Bottom].includes(n)?pt[r]:``,Ut=(e,t,n)=>`${e&&[I.Right,I.Left].includes(t)?ht[n]:``} tw-w-full`,Wt=(e,t,n,r)=>`tw-grow ${e&&[I.Top,I.Bottom].includes(n)?ft[r]:`tw-text-left`} ${t?`tw-self-center tw-w-full @sm:tw-w-auto`:``}`,Gt=(e,t,n)=>`tw-flex tw-grow tw-gap-y-2 tw-gap-x-8 ${e?`tw-flex-col`:`tw-flex-col @sm:tw-flex-row`} ${e&&[I.Right,I.Left].includes(t)?mt[n]:``}`,Kt=(e,t,n,r,i,a,o,s,c,l,u,d)=>({...e&&Me(t),padding:n?r:yt[i],borderRadius:a?o:Pe[s],border:c?`${l} ${u} ${je(d)}`:`none`})})))()}var X,Jt;function Yt(){return(Yt=e((()=>{m(),_(),o(),ee(),wt(),Dt(),Mt(),Lt(),zt(),qt(),H(),X=r(),Jt=({appBridge:e})=>{let{blockSettings:t,cardStyles:n,contentClasses:r,ctaClasses:i,description:a,handleDeleteCustomPreview:o,handleOpenTemplateChooser:s,hasAuthenticatedUser:c,hasPreview:u,hasTitleOnly:d,isEditing:f,lastErrorMessage:p,preview:m,previewClasses:h,previewCustom:g,selectedTemplate:_,templateTextKey:v,textClasses:y,textCtaWrapperClasses:b,title:x,updateBlockSettings:S}=Bt(e),C=async()=>{if(!_)return;let{templateEditing:n}=t;if(n===V.Simple)open(_.creationFormUri,`_self`);else{let t=m===F.Custom&&g?g.previewUrl:_.previewUrl,n={template:{..._,previewUrl:t}};await e.dispatch(l(n))}};return!f&&(!_||!c)?(0,X.jsx)(`div`,{"data-test-id":`container`,className:Ct.scope}):(0,X.jsx)(oe,{scope:Ct.scope,children:(0,X.jsx)(`div`,{"data-test-id":`container`,className:`tw-@container`,children:(0,X.jsxs)(`div`,{"data-test-id":`card`,style:n,children:[f&&p!==``&&(0,X.jsx)(Et,{errorMessage:p}),(0,X.jsxs)(`div`,{"data-test-id":`content`,className:r,children:[u&&(0,X.jsx)(It,{appBridge:e,blockSettings:t,template:_,previewCustom:g,previewClasses:h,updateBlockSettings:S,onOpenTemplateChooser:s,handleNewPublication:C,handleDeleteCustomPreview:o}),(0,X.jsxs)(`div`,{"data-test-id":`text-cta-wrapper`,className:b,children:[(0,X.jsx)(`div`,{"data-test-id":`text`,className:y,children:(0,X.jsx)(Rt,{appBridge:e,updateBlockSettings:S,title:x,description:a,pageCount:t.hasPageCount===!1?void 0:_?.pages.length??0,isEditing:f,hasTitleOnly:d,templateTextKey:v})}),(0,X.jsx)(`div`,{"data-test-id":`cta`,className:i,children:(0,X.jsx)(jt,{blockSettings:t,isEditing:f,isDisabled:!_,updateBlockSettings:S,handleNewPublication:C})})]})]}),f&&!u&&(0,X.jsxs)(`div`,{"data-test-id":`cta-editing-no-preview`,className:`tw-flex tw-justify-between tw-items-center tw-mt-4 tw-p-3 tw-pl-4 tw-bg-black-0 tw-border tw-border-container-secondary tw-rounded-medium tw-flex-col @sm:tw-flex-row`,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(le,{size:`large`,color:`weak`,children:`Connected template: `}),(0,X.jsx)(le,{size:`large`,children:_?.name??`None`})]}),(0,X.jsx)(ce,{className:`tw-line-clamp-2`,emphasis:_?`default`:`strong`,onPress:s,children:_?`Replace template`:`Choose existing template`})]})]})})})},Jt.__docgenInfo={description:``,methods:[],displayName:`TemplateBlock`}})))()}var Xt;function Zt(){return(Zt=e((()=>{E(),xt(),Yt(),Xt=w({block:Jt,settings:bt})})))()}var Qt=t({CustomPreview:()=>sn,Empty:()=>rn,TextBelowWithPageCount:()=>on,WithTemplate:()=>an,WithoutPreview:()=>cn,__namedExportsOrder:()=>ln,default:()=>$t}),$t,Z,en,tn,Q,$,nn,rn,an,on,sn,cn,ln;function un(){return(un=e((()=>{v(),te(),S(),lt(),H(),Zt(),$t={title:`Blocks/Template`,...re(Xt)},Z=g.image(0),en=g.image(5),tn={...ie.with(7001),name:`Social media announcement`,description:`A 1080 × 1080 post with headline, image and logo lockup.`,previewUrl:Z.previewUrl,pages:[{previewUrl:Z.previewUrl,width:Z.width??0,height:Z.height??0},{previewUrl:en.previewUrl,width:en.width??0,height:en.height??0}]},Q=JSON.stringify([{type:`heading3`,children:[{text:`Social media announcement`}]}]),$=JSON.stringify([{type:`p`,children:[{text:`Start from the approved layout and swap in your own headline and photo.`}]}]),nn={appBridge:{blockTemplates:{[P]:[tn]}}},rn={},an={args:{title:Q,description:$},parameters:nn},on={args:{title:Q,description:$,textPositioning:I.Bottom,hasPageCount:!0},parameters:nn},sn={args:{title:Q,description:$,preview:F.Custom},parameters:{appBridge:{blockTemplates:{[P]:[tn]},blockAssets:{previewCustom:[g.image(3)]}}}},cn={args:{title:Q,description:$,preview:F.None},parameters:nn},ln=[`Empty`,`WithTemplate`,`TextBelowWithPageCount`,`CustomPreview`,`WithoutPreview`]})))()}export{un as n,ct as r,Qt as t};