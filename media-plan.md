# Media plan: Integrate homepage film

Direction: Through the mark. Every asset below is **generated with Higgsfield and is a stand-in for atmosphere only**. None of it shows real work, a real client, a real person or a real result. All type, notifications and interface are live HTML on top. Real proof (beat 06) uses real screenshots of live client sites, captured separately.

## Visual bible (prefixed to every prompt)

> Black and white fine-art studio photograph, true neutral greyscale with no colour tint. One soft key light from upper left, a faint cool rim light from behind right, background falling away to pure black. Shallow depth of field, 85mm lens feel at f/2, camera slightly above the surface in a three-quarter view. Fine film grain. Materials: brushed metal, matte black plastic, a worn timber workbench top, matte paper. No people, no hands, no faces. No text, letters, numbers, logos or brand marks anywhere. No screens showing any interface.

- Lighting: single soft key upper left, cool rim behind right, black ground.
- Lens: 85mm feel, shallow focus, slow moves only (push in, rack focus).
- Grade: monochrome. The only accent on the page is the silver sheen in live CSS, never in the media.
- Materials: brushed metal, matte black, worn timber, matte paper.

Models: stills `gpt_image_2_6` (quality high, 2k), 12 stills, 45 credits. Video: `seedance_2_5` image-to-video (omni_reference mode), 5s, 1080p, no audio, 80 credits a clip, 4 clips (plus one failed first attempt at the hero phone crop). Each clip uses the same still as start_image AND end_image, which is what makes the loop seamless.

## Assets

| ID | Beat | Subject | Ratios | Motion | Use | Poster | File stem |
|----|------|---------|--------|--------|-----|--------|-----------|
| M01 | 01 Cold open | A phone lying face down on the workbench, light leaking from under its edges, a tape measure and pencil soft in the background. Subject right, empty black left for the headline. | 16:9, 3:4 (phone) | 5s loop, locked-off: the edge glow brightens once and settles. The slow push in is done in CSS, so the clip itself can loop cleanly | Loop (H.264 + WebM), sharp still first | M01 still | `hero-phone` |
| M02 | 02 The noise | The same bench at the end of a day: scattered tools, loose blank paper, keys, a mug, cable offcuts, in disorder. | 16:9, 9:16 | Still, moved in CSS as the background depth layer | Still (AVIF/WebP) | itself | `bench-noise` |
| M03 | 05 Plumbers | Lengths of copper pipe and a brass fitting on the bench, one pipe forming a clean horizontal line across the frame. | 16:9, 4:5 | Still (optional 4s rack focus later) | Still | itself | `trade-plumbing` |
| M04 | 05 Electricians | A coil of cable with one length pulled out straight as a horizontal line, a pair of side cutters beside it. | 16:9, 4:5 | Still (optional rack focus later) | Still | itself | `trade-electrical` |
| M05 | 05 Kitchen fitters | The square front edge of a stone worktop as a horizontal line, a spirit level resting on it. | 16:9, 4:5 | Still (optional rack focus later) | Still | itself | `trade-kitchens` |
| M06 | 08 The payoff | The bench from M02, now in order: tools laid out in a neat row, paper squared, the phone face up and dark. Generated with M02 as reference so it is the same bench. | 16:9, 9:16 | 5s loop, locked-off: a band of light drifts across the tools and returns | Loop | M06 still | `bench-order` |

M02 and M06 are the start and end keyframes of the film (disorder, then order). M03 to M05 share one horizon line at the same height so the trade cuts match-cut on it; the page's line runs along that horizon.

## Web encodes (ffmpeg)

- Loops (M01, M06): H.264 MP4 `-movflags +faststart` plus VP9 WebM, muted, playsinline, poster. Desktop 1600px wide, mobile 4:5 or 9:16 at 720px wide, target under 2 MB mobile, hero under 3 MB.
- No scroll-scrubbed video in this direction: the turn is live SVG and CSS masks, which stay sharp and cost nothing to seek. Recorded here so nobody adds `-g 1` encodes that are not needed.
- Stills: AVIF with WebP fallback via `next/image`, hero still with `priority`.
- Everything below the first screen lazy loads; loops pause off screen.

## What was learned generating these

- Generating the phone crops with the desktop still as an image reference kept the bench, props and light identical across crops.
- The end frame (M06, order) was generated from the start frame (M02, noise) as a reference with "the same bench, now in order", which is why the two read as one bench.
- Seedance rejected `aspect_ratio: auto` with a 4:5 start image; 3:4 worked. Because 3:4 crops differently from the 4:5 still, the phone hero's still on the page is frame 0 of the clip itself, so the still-to-video fade has no jump.
- Asking for "completely locked-off camera" and putting all the motion in the light gave clips that loop and that sit under live HTML without drift. Camera moves belong in CSS where they can be scrubbed and reduced.
- Final web sizes: hero loop 131 kB WebM / 266 kB MP4 (desktop), 81 kB / 133 kB (phone); payoff loop 407 kB / 609 kB (desktop), 299 kB / 426 kB (phone). A loop is only fetched after the page has loaded and its frame is within one screen of the viewport.

## Raw files

Raw downloads go to `public/media/raw/` (not shipped: excluded from the build output by living outside the paths the page references). Web encodes go to `public/media/film/`.
