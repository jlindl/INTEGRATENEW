/**
 * The ten immersive homepage demos at /web-design/immersive/<slug>.
 *
 * Each is a scroll-driven homepage for a made-up trade business, built on
 * the kit in components/web-design/immersive. This list feeds the "Immersive
 * homepages" section of /web-design.
 *
 * `poster` is a screenshot of the demo's first screen and `preview` a short
 * silent recording of its signature scroll scene, both captured from the
 * running demo (public/media/demos/<slug>/poster.jpg, preview.webm/.mp4).
 */

export type ImmersiveDemo = {
  slug: string;
  /** Who it is for, plural: "Roofers". */
  trade: string;
  /** e.g. "Roofer homepage". */
  kind: string;
  /** The made-up business. */
  business: string;
  /** The signature scroll scene, by name. */
  scene: string;
  /** One line on what happens when you scroll. */
  pitch: string;
  /** The interactive piece on the page. */
  tool: string;
};

export const IMMERSIVE_DEMOS: ImmersiveDemo[] = [
  {
    slug: "roofers",
    trade: "Roofers",
    kind: "Roofer homepage",
    business: "Slatewell Roofing",
    scene: "Course by course",
    pitch: "A slate roof lays itself as you scroll, one course at a time, from the eaves up to the ridge.",
    tool: "Find-the-fault roof diagram",
  },
  {
    slug: "heating-engineers",
    trade: "Heating engineers",
    kind: "Heating engineer homepage",
    business: "Emberline Heating",
    scene: "Turn it up",
    pitch: "Your thumb turns the thermostat: the dial climbs and the whole page goes from frost to warm.",
    tool: "Boiler symptom checker",
  },
  {
    slug: "builders",
    trade: "Builders",
    kind: "Builder homepage",
    business: "Fenwick & Rowe",
    scene: "Drawn, then built",
    pitch: "An extension draws itself as a blueprint, then the finished build rises through the drawing.",
    tool: "Project picker",
  },
  {
    slug: "landscapers",
    trade: "Landscapers",
    kind: "Landscaper homepage",
    business: "Tallow & Thorn",
    scene: "Walk the garden",
    pitch: "Scrolling walks you along a garden from patio to pergola while afternoon turns to dusk.",
    tool: "Seasons planner",
  },
  {
    slug: "kitchen-fitters",
    trade: "Kitchen fitters",
    kind: "Kitchen fitter homepage",
    business: "Marlowe Kitchens",
    scene: "Specify it",
    pitch: "A kitchen re-finishes itself as you scroll: doors, worktop and handles, with the spec sheet keeping up.",
    tool: "Finish configurator",
  },
  {
    slug: "bathroom-fitters",
    trade: "Bathroom fitters",
    kind: "Bathroom fitter homepage",
    business: "Tideline Bathrooms",
    scene: "High tide",
    pitch: "The waterline rises over a tired bathroom and the new wet room surfaces underneath it.",
    tool: "Behind-the-tiles cutaway",
  },
  {
    slug: "joiners",
    trade: "Joiners",
    kind: "Joiner homepage",
    business: "Harrow & Pike Joinery",
    scene: "It fits",
    pitch: "Two oak boards slide together into a dovetail, and the headline joins up as the joint closes.",
    tool: "Timber and finish selector",
  },
  {
    slug: "loft-conversions",
    trade: "Loft conversions",
    kind: "Loft conversion homepage",
    business: "Upstairs Loft Co.",
    scene: "Go up",
    pitch: "You rise through a house floor by floor until the loft lights up and the stars come out.",
    tool: "Which-loft-is-yours picker",
  },
  {
    slug: "painters-decorators",
    trade: "Painters and decorators",
    kind: "Decorator homepage",
    business: "Hue & Cry Decorators",
    scene: "Try it on the wall",
    pitch: "A roller follows your thumb across the wall, three coats in three colours, each one named.",
    tool: "Paint-chip wall and paint calculator",
  },
  {
    slug: "window-door-installers",
    trade: "Window and door installers",
    kind: "Window installer homepage",
    business: "Clearline Windows & Doors",
    scene: "Open up",
    pitch: "Four bifold doors fold back as you scroll and the garden comes into the room.",
    tool: "Window and door style picker",
  },
];

export const immersiveHref = (slug: string) => `/web-design/immersive/${slug}`;
export const immersivePoster = (slug: string) => `/media/demos/${slug}/poster.jpg`;
export const immersivePreview = (slug: string) => ({
  webm: `/media/demos/${slug}/preview.webm`,
  mp4: `/media/demos/${slug}/preview.mp4`,
});
