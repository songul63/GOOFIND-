import { getCommunityRegion, type CanadianRegion } from './regions';

const COVER_THUMB = 960;

/** Normalize Wikimedia thumb URLs to a size that exists on the CDN. */
function normalizeCoverUrl(url: string): string {
  if (!url.includes('upload.wikimedia.org/wikipedia/commons/thumb/')) return url;
  return url.replace(/\/(\d+)px-/, `/${COVER_THUMB}px-`);
}

/** City-specific cover photos (downtown / iconic landmarks) via Wikimedia Commons */
export const COMMUNITY_COVER_IMAGES: Record<string, string> = {
  all:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Toronto_-_ON_-_Skyline10.jpg/960px-Toronto_-_ON_-_Skyline10.jpg',
  toronto:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Toronto_-_ON_-_Skyline10.jpg/960px-Toronto_-_ON_-_Skyline10.jpg',
  'north-york':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/North_York_Central_Library.jpg/960px-North_York_Central_Library.jpg',
  mississauga:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Absolute_Towers_-_20191019183707.jpg/960px-Absolute_Towers_-_20191019183707.jpg',
  brampton:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Brampton_ON_Downtown_2022-01-30.jpg/960px-Brampton_ON_Downtown_2022-01-30.jpg',
  'richmond-hill':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Richmond_Hill_Municipal_Offices-_Richmond_Hill-Ontario-20200808.jpg/960px-Richmond_Hill_Municipal_Offices-_Richmond_Hill-Ontario-20200808.jpg',
  markham:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Main_Street_Unionville_2.jpg/960px-Main_Street_Unionville_2.jpg',
  oakville:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Oakville_Harbour-Laslovarga_%286%29.JPG/960px-Oakville_Harbour-Laslovarga_%286%29.JPG',
  burlington:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/At_the_Burlington_waterfront%2C_Ontario%2C_Canada.jpg/960px-At_the_Burlington_waterfront%2C_Ontario%2C_Canada.jpg',
  hamilton:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Hamilton_Panoramic.jpg/960px-Hamilton_Panoramic.jpg',
  vaughan:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Q3555074_Vaughan_Metropolitan_Centre_A02.jpg/960px-Q3555074_Vaughan_Metropolitan_Centre_A02.jpg',
  aurora:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Aurora_Ontario_-_Canada_-_Downtown_-_Younge_Street_%2851264219344%29.jpg/960px-Aurora_Ontario_-_Canada_-_Downtown_-_Younge_Street_%2851264219344%29.jpg',
  oshawa:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Oshawa_ON.JPG/960px-Oshawa_ON.JPG',
  london:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/London_Ontario_Skyline_2017_%28cropped%29.jpg/960px-London_Ontario_Skyline_2017_%28cropped%29.jpg',
  niagara:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Niagara_Falls_Ontario_Canada_aerial_view.jpg/960px-Niagara_Falls_Ontario_Canada_aerial_view.jpg',
  guelph:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Guelph_Downtown_Aerial.jpg/960px-Guelph_Downtown_Aerial.jpg',
  barrie:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Barrie_skyline_2025.jpg/960px-Barrie_skyline_2025.jpg',
  waterloo:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Uptown_Waterloo_Ontario.JPG/960px-Uptown_Waterloo_Ontario.JPG',
  king:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/KingTownship.jpg/960px-KingTownship.jpg',
  stouffville:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/MainSteetWhitchurch-Stouffville2.jpg/960px-MainSteetWhitchurch-Stouffville2.jpg',
  newmarket:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Old_Town_Hall-460_Botsford_Street-Newmarket-Ontario-HPC6381-20200905.jpg/960px-Old_Town_Hall-460_Botsford_Street-Newmarket-Ontario-HPC6381-20200905.jpg',
  ajax:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Aerial_Photograph_of_Ajax%2C_Ontario_-_Discover_The_Town_Of_Ajax_%2801m08s%29_%28edited%29.jpg/960px-Aerial_Photograph_of_Ajax%2C_Ontario_-_Discover_The_Town_Of_Ajax_%2801m08s%29_%28edited%29.jpg',
  pickering:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Creeks_feeding_Frenchman%27s_Bay%2C_Pickering%2C_Ontario.jpg/960px-Creeks_feeding_Frenchman%27s_Bay%2C_Pickering%2C_Ontario.jpg',
  whitby:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Downtown_Whitby%2C_Ontario%2C_March_9_2026_%2803%29.jpg/960px-Downtown_Whitby%2C_Ontario%2C_March_9_2026_%2803%29.jpg',
  kitchener:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Kitchener_Skyline_December_2021.jpg/960px-Kitchener_Skyline_December_2021.jpg',
  cambridge:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Europe-like_Grand_River_scene%2C_Cambridge%2C_Ontario_Cambridge-on-canada-peter-j-restivo-5292017_037.jpg/960px-Europe-like_Grand_River_scene%2C_Cambridge%2C_Ontario_Cambridge-on-canada-peter-j-restivo-5292017_037.jpg',
  brantford:
    'https://upload.wikimedia.org/wikipedia/commons/b/b7/Brantford_Montage.jpg',
  'st-catharines':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/St._Catharines_Downtown_Centre-ville_de_St._Catharines_%2823904737637%29.jpg/960px-St._Catharines_Downtown_Centre-ville_de_St._Catharines_%2823904737637%29.jpg',
  milton:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Downtown_Milton2.jpg/960px-Downtown_Milton2.jpg',
  caledon:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Cheltenham_Badlands%2C_Caledon_Hills%2C_Ontario%2C_Canada._%287097453311%29.jpg/960px-Cheltenham_Badlands%2C_Caledon_Hills%2C_Ontario%2C_Canada._%287097453311%29.jpg',
  peterborough:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Peterborough_Aerial_view_2025.jpg/960px-Peterborough_Aerial_view_2025.jpg',
  'dufferin-county':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Orangeville_ON.jpg/960px-Orangeville_ON.jpg',
  georgina:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Sibbald_Point_Provincial_Park_-_a_view_to_Lake_Simcoe_%282%29.jpg/960px-Sibbald_Point_Provincial_Park_-_a_view_to_Lake_Simcoe_%282%29.jpg',
  'east-gwillimbury':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Kelly_Swing_Bridge.jpg/960px-Kelly_Swing_Bridge.jpg',
  ottawa:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Parliament-Ottawa.jpg/960px-Parliament-Ottawa.jpg',
  montreal:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Montreal%2C_Quebec_skyline.jpg/960px-Montreal%2C_Quebec_skyline.jpg',
  laval:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Laval_Quebec_Montage.jpg/960px-Laval_Quebec_Montage.jpg',
  'quebec-city':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Quebec_City_skyline_from_L%C3%A9vis.jpg/960px-Quebec_City_skyline_from_L%C3%A9vis.jpg',
  gatineau:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Gatineau_-_QC_-_Museum_of_Civilisation3.jpg/960px-Gatineau_-_QC_-_Museum_of_Civilisation3.jpg',
  longueuil:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Longueuil_City_Hall_2011.jpg/960px-Longueuil_City_Hall_2011.jpg',
  calgary:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Downtown_Calgary_2020-4.jpg/960px-Downtown_Calgary_2020-4.jpg',
  edmonton:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Alberta_Legislature_Building_at_night.jpg/960px-Alberta_Legislature_Building_at_night.jpg',
  'red-deer':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Red_Deer_-_Aerial_-_downtown_bridges.jpg/960px-Red_Deer_-_Aerial_-_downtown_bridges.jpg',
  lethbridge:
    'https://upload.wikimedia.org/wikipedia/commons/4/47/Lethbridge_downtown.jpg',
  'medicine-hat':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Medicine_Hat_College_View.jpg/960px-Medicine_Hat_College_View.jpg',
  'fort-mcmurray':
    'https://upload.wikimedia.org/wikipedia/commons/2/20/Fort_mcmurray_aerial.jpg',
  vancouver:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Skyline_of_Vancouver%2C_Canada.jpg/960px-Skyline_of_Vancouver%2C_Canada.jpg',
  surrey:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Surrey_City_Centre_%282025%29_%28cropped%29.jpg/960px-Surrey_City_Centre_%282025%29_%28cropped%29.jpg',
  burnaby:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Metrotown_aerial_view_2025.jpg/960px-Metrotown_aerial_view_2025.jpg',
  victoria:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Victoria_BC%2C_Canada_%28Johnson_Street%29_-_panoramio.jpg/960px-Victoria_BC%2C_Canada_%28Johnson_Street%29_-_panoramio.jpg',
  kelowna:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Kelowna_city_view_from_Knox_Mountain.jpg/960px-Kelowna_city_view_from_Knox_Mountain.jpg',
  richmond:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Richmond%2C_British_Columbia_%28cropped%29.jpg/960px-Richmond%2C_British_Columbia_%28cropped%29.jpg',
  winnipeg:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Winnipeg%2C_Manitoba_skyline_%28cropped%29.jpg/960px-Winnipeg%2C_Manitoba_skyline_%28cropped%29.jpg',
  brandon:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Dominion_Exhibition_Display_Building_II_flags.jpg/960px-Dominion_Exhibition_Display_Building_II_flags.jpg',
  steinbach:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Steinbach_montage_2.jpg/960px-Steinbach_montage_2.jpg',
  thompson:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Spirit_Way_Wolf_Mural.jpg/960px-Spirit_Way_Wolf_Mural.jpg',
  'portage-la-prairie':
    'https://upload.wikimedia.org/wikipedia/commons/9/9d/Portage_la_Prairie_-_City_Collage.jpg',
  selkirk:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Selkirk_MB_watertower.jpg/960px-Selkirk_MB_watertower.jpg',
  saskatoon:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Saskatoon%2C_Saskatchewan.jpg/960px-Saskatoon%2C_Saskatchewan.jpg',
  regina:
    'https://upload.wikimedia.org/wikipedia/commons/4/48/Reginadowntown_%28cropped%29.png',
  'prince-albert':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Prince_Albert_Saskatchewan_in_fall_01.JPG/960px-Prince_Albert_Saskatchewan_in_fall_01.JPG',
  'moose-jaw':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/City_Hall_Moose_Jaw.jpg/960px-City_Hall_Moose_Jaw.jpg',
  'swift-current':
    'https://upload.wikimedia.org/wikipedia/commons/f/f0/Citysign1.jpg',
  yorkton:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/YorktonDownTownStreet.JPG/960px-YorktonDownTownStreet.JPG',
  halifax:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Halifax_Harbour_Sunset_Skyline%2C_Nova_Scotia_%2824237034620%29.jpg/960px-Halifax_Harbour_Sunset_Skyline%2C_Nova_Scotia_%2824237034620%29.jpg',
  dartmouth:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Dartmouth%2C_Nova_Scotia%2C_Canada.jpg/960px-Dartmouth%2C_Nova_Scotia%2C_Canada.jpg',
  sydney:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Sydney%2C_Nova_Scotia_waterfront_in_September_2017.jpg/960px-Sydney%2C_Nova_Scotia_waterfront_in_September_2017.jpg',
  truro:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Truro%2C_Nova_Scotia%2C_Canada.jpg/960px-Truro%2C_Nova_Scotia%2C_Canada.jpg',
  'new-glasgow':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/New_Glasgow%2C_Nova_Scotia_%282675072170%29.jpg/960px-New_Glasgow%2C_Nova_Scotia_%282675072170%29.jpg',
  bridgewater:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/East_side_of_Bridgewater%2C_Nova_Scotia.JPG/960px-East_side_of_Bridgewater%2C_Nova_Scotia.JPG',
  moncton:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/View_of_the_Moncton%2C_New_Brunswick_skyline_%28cropped%29.jpg/960px-View_of_the_Moncton%2C_New_Brunswick_skyline_%28cropped%29.jpg',
  'saint-john':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Saint_John%2C_New_Brunswick%2C_Canada.jpg/960px-Saint_John%2C_New_Brunswick%2C_Canada.jpg',
  fredericton:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Fredericton%2C_New_Brunswick_skyline.jpg/960px-Fredericton%2C_New_Brunswick_skyline.jpg',
  dieppe:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Dieppe_Christmas_Over_The_Petit_%2823574054129%29.jpg/960px-Dieppe_Christmas_Over_The_Petit_%2823574054129%29.jpg',
  miramichi:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Miramichi_Bridge_New-Brunswick_Canada_banner.jpg/960px-Miramichi_Bridge_New-Brunswick_Canada_banner.jpg',
  edmundston:
    'https://upload.wikimedia.org/wikipedia/commons/b/bf/Edmundston.jpg',
  'st-johns':
    'https://upload.wikimedia.org/wikipedia/commons/7/75/St._John%27s_Collage.jpg',
  'mount-pearl':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Mount_Pearl%2C_NL.jpg/960px-Mount_Pearl%2C_NL.jpg',
  'corner-brook':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Corner_Brook%2C_NL.jpg/960px-Corner_Brook%2C_NL.jpg',
  'grand-falls-windsor':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Grand_Falls-Windsor%2C_NL.jpg/960px-Grand_Falls-Windsor%2C_NL.jpg',
  gander:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Landing_in_Gander.jpg/960px-Landing_in_Gander.jpg',
  'happy-valley-goose-bay':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Goose_Bay_Labrador_%282513512285%29.jpg/960px-Goose_Bay_Labrador_%282513512285%29.jpg',
  charlottetown:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Charlottetown%2C_PEI_skyline.jpg/960px-Charlottetown%2C_PEI_skyline.jpg',
  summerside:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Summerside%2C_Prince_Edward_Island.jpg/960px-Summerside%2C_Prince_Edward_Island.jpg',
  'stratford-pe':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Stratford%2C_Prince_Edward_Island%2C_Canada.jpg/960px-Stratford%2C_Prince_Edward_Island%2C_Canada.jpg',
  'cornwall-pe':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Cornwall%2C_PEI.jpg/960px-Cornwall%2C_PEI.jpg',
  montague:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Montague%2C_Prince_Edward_Island%2C_Canada.jpg/960px-Montague%2C_Prince_Edward_Island%2C_Canada.jpg',
  kensington:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Kensington%2C_Prince_Edward_Island.jpg/960px-Kensington%2C_Prince_Edward_Island.jpg',
  sherbrooke:
    'https://upload.wikimedia.org/wikipedia/commons/2/2e/Sherb.jpg',
  levis:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Quebec_City_skyline_from_L%C3%A9vis.jpg/960px-Quebec_City_skyline_from_L%C3%A9vis.jpg',
  'trois-rivieres':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Trois-Rivi%C3%A8res%2C_Quebec_%28cropped%292.jpg/960px-Trois-Rivi%C3%A8res%2C_Quebec_%28cropped%292.jpg',
  brossard:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Brossard%2C_Quebec.jpg/960px-Brossard%2C_Quebec.jpg',
  terrebonne:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Terrebonne-rue_St-Pierre.jpg/960px-Terrebonne-rue_St-Pierre.jpg',
};

const REGION_COVER_FALLBACKS: Record<CanadianRegion, string> = {
  ON: COMMUNITY_COVER_IMAGES.toronto,
  QC: COMMUNITY_COVER_IMAGES.montreal,
  AB: COMMUNITY_COVER_IMAGES.calgary,
  BC: COMMUNITY_COVER_IMAGES.vancouver,
  MB: COMMUNITY_COVER_IMAGES.winnipeg,
  SK: COMMUNITY_COVER_IMAGES.saskatoon,
  NS: COMMUNITY_COVER_IMAGES.halifax,
  NB: COMMUNITY_COVER_IMAGES.moncton,
  NL: COMMUNITY_COVER_IMAGES['st-johns'],
  PE: COMMUNITY_COVER_IMAGES.charlottetown,
};

export function getCommunityCoverImage(communityId: string, fallback?: string): string {
  return resolveCommunityImageUrl(communityId, fallback) || COMMUNITY_COVER_IMAGES.all;
}

export function resolveCommunityImageUrl(communityId: string, fallback?: string): string {
  const cover = COMMUNITY_COVER_IMAGES[communityId];
  if (cover) return normalizeCoverUrl(cover);
  if (fallback?.startsWith('http')) return normalizeCoverUrl(fallback);
  const region = getCommunityRegion({ id: communityId });
  if (region && REGION_COVER_FALLBACKS[region]) return normalizeCoverUrl(REGION_COVER_FALLBACKS[region]);
  return normalizeCoverUrl(COMMUNITY_COVER_IMAGES.all);
}
