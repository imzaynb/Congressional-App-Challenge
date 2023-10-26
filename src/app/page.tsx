"use client";

import Map from "@/components/map";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useState } from "react";
import {LocationCard} from "@/components/location-card";

let hotels_dictionary = {"100 Townsend St, Birmingham, MI 48009-6068":[42.54492084597748, -83.21533837375769],
                     "811 E Eleven Mile Rd, Royal Oak, MI 48067-1965":[42.4903744430497, -83.13492142011665],
                     "2550 Troy Center Dr, Troy, MI 48084":[42.55730876255883, -83.16016429229931],
                     "32420 Stephenson Hwy., Madison Heights, MI 48071":[42.52998004090962, -83.11867423887077],
                     "100 Wilshire Dr, Troy, MI 48084-1651":[42.56382815278382, -83.16193557325589],
                     "51620 Shelby Parkway, Shelby Township, MI 48315-1786":[42.674320259204315, -83.01280435235884],
                     "2200 Featherstone Rd, Auburn Hills, MI 48326-2806":[42.6482297750514, -83.24513184441743],
                     "45311 Park Ave, Utica, MI 48315-5907":[42.62827189565542, -83.01076665791079],
                     "39475 Woodward Ave, Bloomfield Hills, MI 48304-5023":[42.581134271907786, -83.24376254441958],
                     "850 Tower Drive, Troy, MI 48098":[42.59729847555958, -83.16320161373312],
                     "2300 Featherstone Road, Auburn Hills, MI 48326-2844":[42.648449449317816, -83.24360355976033],
                     "32800 Stephenson Hwy, Madison Heights, MI 48071-5524":[42.532558947156176, -83.11946266161425],
                     "1495 Equity Dr, Troy, MI 48084-7112":[42.54455133529576, -83.17488408859941],
                     "36400 Van Dyke Ave, Sterling Heights, MI 48312-2703":[42.56104535918547, -83.02710349044908],
                     "45725 Marketplace Blvd, Chesterfield, MI 48051":[42.63578722875069, -82.85548868489617],
                     "2537 Rochester Ct., Troy, MI 48083-1875":[42.55736213399053, -83.13158465791312],
                     "11500 East 11 Mile Road, Warren, MI 48089":[42.4902578393583, -83.00860067140813],
                     "225 Stephenson Hwy, Troy, MI 48083":[42.53520561450428, -83.12099208859973],
                     "31900 Little Mack Ave, Roseville, MI 48066-4529":[42.53520561450428, -83.12099208859973],
                     "30120 N Civic Center Drive, Warren, MI 48093":[42.514872397007295, -83.02450407325746],
                     "7001 Convention Blvd, Warren, MI 48092-3883":[42.51494769660753, -83.0244779574943],
                     "30180 N Civic Center Blvd, Warren, MI 48093-6730":[42.51559863857133, -83.02450407325745],
                     "8515 15 Mile Road, Sterling Heights, MI 48312":[42.55244482363206, -83.02462855976343],
                     "3544 Marketplace Circle, Rochester Hills, MI 48309":[42.64411934678396, -83.20202405976049],
                     "1525 East Maple Road, Troy, MI 48083":[42.549856174993906, -83.11978660209209],
                     "30000 Van Dyke Ave, Warren, MI 48093":[42.51388367955048, -83.02576297325754],
                     "45555 Utica Park Blvd, Utica, MI 48315-5948":[42.630868151827, -83.00997691558223],
                     "46000 Utica Park Blvd, Utica, MI 48315":[42.632103664563914, -83.01226030208939],
                     "14800 Lakeside Circle, Sterling Heights, MI 48313-1344":[42.6245553598753, -82.98079520208961],
                     "20445 Erin St, Roseville, MI 48066-4535":[42.52936955835765, -82.91057308859995],
                     "26091 Dequindre Rd I-696 at DeQuindre Road Exit 20, Madison Heights, MI 48071-3820":[42.48666101212004, -83.08544867325833],
                     "11000 W 8 Mile Rd, Ferndale, MI 48220-2127":[42.44656008806993, -83.16992324442396],
                     "34911 Van Dyke Ave, Sterling Heights, MI 48312-4662":[42.54995237498141, -83.03006544627073],
                     "20313 E 13 Mile Rd, Roseville, MI 48066-4575":[42.525520136699114, -82.9142843290784],
                     "7454 Convention Blvd, Warren, MI 48092-3874":[42.53053459608668, -83.03141598859989],
                     "1294 N Opdyke Rd, Auburn Hills, MI 48326-2647":[42.65759074990808, -83.24155215975996],
                     "3315 University Dr, Auburn Hills, MI 48326-2363":[42.67313385386801, -83.22479370208802],
                     "31327 Gratiot Ave, Roseville, MI 48066-4556":[42.52661104414511, -82.91813298860004],
                     "7010 Convention Blvd, Warren, MI 48092":[42.530204227064395, -83.03303371743563],
                     "2100 Featherstone Rd, Auburn Hills, MI 48326-2804":[42.648230014435136, -83.24606162907443],
                     "3555 Centerpoint Pkwy, Pontiac, MI 48341-3158":[42.607287298874084, -83.25088277325447],
                     "33400 Van Dyke Ave, Sterling Heights, MI 48312-5927":[42.539865276259775, -83.02716810209238],
                     "3600 Centerpoint Pkwy, Pontiac, MI 48341":[42.60542538729787, -83.25158457140438],
                     "400 Stephenson Hwy, Troy, MI 48083-1129":[42.537404976571544, -83.11896227695703],
                     "45805 Marketplace Boulevard, Chesterfield, MI 48051":[42.63642307116869, -82.8561031597607],
                     "46155 Utica Park Blvd, Utica, MI 48315-5919":[42.632920984589155, -83.01216570208936],
                     "32650 Stephenson Highway, Madison Heights, MI 48071":[42.53106722164036, -83.11709554627132],
                     "200 Wilshire Dr, Troy, MI 48084-1695":[42.564445855449264, -83.16085452907718],
                     "200 W. Big Beaver Rd., Troy, MI 48084-5219":[42.56343955651917, -83.15204295976312]}

let restaurants_dictionary = {"18480 Mack Ave, Grosse Pointe Farms, MI 48236-3222": [42.41045799648733, -82.91307041532937],
"20420 Haggerty Rd, Northville, MI 48167-3955": [42.436695844292785, -83.4344498444083],
"1707 E Perry St, Port Clinton, OH 43452-1425": [41.51492023842891, -82.91826200211104],
"19470 Haggerty Rd, Livonia, MI 48152": [42.427764432669704, -83.43248405975301],
"27900 21 Mile Rd, Chesterfield, MI 48047-4908": [42.644414287503714, -82.8290864732375],
"12150 Market Place Dr, Birch Run, MI 48415-9489": [43.247833226577086, -83.78270795972544],
"22148 Michigan Ave, Dearborn, MI 48124-2205": [42.30571787119813, -83.24732918859317],
"7175 Engle Road, Middleburg Heights, OH 44130": [41.37281356402134, -81.82403389762344],
"17125 Conant St, Detroit, MI 48212-1127": [42.418926821741906, -83.06413626213218],
"45700 N Gratiot Ave, Macomb, MI 48042": [42.63568048528907, -82.85728687323771],
"31803 Van Dyke Ave, Warren, MI 48093-7943": [42.52645355084207, -83.02959218858577],
"13911 Middlebelt Rd I-96 and Schoolcraft, Livonia, MI 48154": [42.38422389791055, -83.33440360208232],
"51111 Washington St, New Baltimore, MI 48047-2160": [42.680432909382255, -82.73624258858064],
"13785 Lakeside Cir, Sterling Heights, MI 48313-1315": [42.62327839312297, -82.99183818858252],
"29441 Five Mile Rd., Livonia, MI 48154-3709": [42.39642575511502, -83.33521667324572],
"17500 Silver Pkwy, Fenton, MI 48430-3422": [42.79564832591598, -83.7387763443963],
"9729 Belleville Rd, Belleville, MI 48111-1305": [42.23153845120397, -83.48505231557907],
"512 E William St, Ann Arbor, MI 48104-2418": [42.27762119480206, -83.74267694441359],
"32040 Van Dyke Ave, Warren, MI 48093-1023": [42.52973445208768, -83.02876120393006],
"114 W Middle St, Chelsea, MI 48118-1225": [42.3181031733484, -84.02130831742889],
"11747 E 13 Mile Rd, Warren, MI 48093-3022": [42.521766019588945, -83.0058030020777],
"57721 Grand River Ave, New Hudson, MI 48165-8542": [42.512836103183375, -83.62350315975016],
"5617 W Saginaw Hwy, Lansing, MI 48917": [42.74030391184618, -84.63024954439811],
"5719 W Saginaw Hwy, Lansing, MI 48917": [42.740241972843386, -84.63164330207036],
"1196 Northwest Ave, Jackson, MI 49202": [42.26326141076458, -84.42421757209678],
"8975 Market Place Dr., Birch Run, MI 48415": [43.245369475472714, -83.7752637758485],
"4141 Miller Rd, Flint, MI 48507-1229": [42.9813340380572, -83.7565320840343],
"730 S Main St, Frankenmuth, MI 48734": [43.32701037587466, -83.7409969196159],
"925 S Main St G1, Frankenmuth, MI 48734-1808": [43.32402205002054, -83.73966554971986],
"3500 Wilder Rd, Bay City, MI 48706-2112": [43.62349251355862, -83.91359462296002],
"175 E Jefferson St, Frankenmuth, MI 48734-1935": [43.32133641961584, -83.73697133644195],
"44887 Mound Road, Sterling Heights, MI 48314": [42.62342068768723, -83.05899970207423],
"110 Battle Aly, Holly, MI 48442-1608": [42.79081845145456, -83.62668598857697],
"8225 W Ridgewood Dr, Parma, OH 44129-5522": [41.38415322122962, -81.74259313107903],
"6095 Commerce Circle, Willoughby, OH 44094": [41.604402021973016, -81.43823935021149],
"3022 Canon St, San Diego, CA 92106-2612": [32.72190269504686, -117.23222537353725],
"14905 Pomerado Rd, Poway, CA 92064-2804": [32.98229888386184, -117.06112849540023],
"Anaheim garden mall, Level 3 Upper Level - 320 321 W. Katella Avenue, Anaheim, CA": [33.8039485266397, -117.91222633620042],
"939 4th Ave, San Diego, CA 92101-6123": [32.715208566442875, -117.16092630584549],
"5871 Westminster Blvd, Westminster, CA 92683-3580": [33.75934173381246, -118.02637148885368],
"115 W Washington Ave, San Diego, CA 92020-5135": [32.78737693918706, -116.96300920676981],
"247 Broadway St, Laguna Beach, CA 92651-1806": [33.543431804413245, -117.78450206077656],
"349 W Felicita Ave, Escondido, CA 92025-6515": [33.103350341520425, -117.07351037421071],
"5575 Balboa Ave Ste. 310, San Diego, CA 92111-2736": [32.81951712657838, -117.18058635009781],
"3455 Sports Arena Boulevard Suite 110, San Diego, CA 92110": [32.75293015832184, -117.21005710237277]}


let allLocations = {
  ...hotels_dictionary,
  ...restaurants_dictionary
};

const center = { lat: 42.65123562471941, lng: -83.11635242753731 };
let markers = Object.entries(allLocations).map(([address, [lat, lng]]) => {
  return { lat, lng };
});

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const [center, setCenter] = useState({ lat: 42.6512, lng: -83.1163 });

  const updateCenter = (newCenter: React.SetStateAction<{ lat: number; lng: number; }>) => {
    setCenter(newCenter);
  };

  //Will need to create a function that auto fills cards with all business info
  return (
    <>
      {!isLoaded ? (
        <></>
      ) : (
        <main>
          <div className="">
            {isSignedIn ? (
              <Map center={center} locations={markers} />
            ) : (
              <>
                <SignInButton />
                <SignUpButton />
              </>
            )}
          </div>
          <div>
            <div className="overflow-y-scroll scrollbar top-[66px] bottom-0 fixed w-1/4">
              <LocationCard lat={42.64221926027109} lng={-83.131136321876141}/>
            </div>
          </div>
        </main>
      )}
    </>
  )
}

