import { GoogleGenerativeAI } from "@google/generative-ai";

let API_KEY = apiKeys.google;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

var billData;
// BioGuideIDs for all members of congress
var bioguideIdByName = {
  "Greg Lopez": "L000604",
  "Kevin Mullin": "M001225",
  "LaMonica McIver": "M001229",
  "Tim Johnson": "J000177",
  "George Helmy": "H001097",
  "David Curson": "C001089",
  "Daniel Evans": "E000236",
  "Jim Sasser": "S000068",
  "Raul Ruiz": "R000599",
  "La De": "D000594",
  "Robert Menendez": "M001226",
  "Bob Carr": "C000178",
  "Henry Nowak": "N000163",
  "Bill Pascrell": "P000096",
  "Cory Booker": "B001288",
  "Lee Jackson": "J000032",
  "Donald Payne": "P000149",
  "Mike Gallagher": "G000579",
  "Steven Symms": "S001138",
  "Jennifer Kiggans": "K000399",
  "Marilyn Strickland": "S001159",
  "Mike Carey": "C001126",
  "Michael Rulli": "R000619",
  "Vince Fong": "F000480",
  "Timothy Kennedy": "K000402",
  "Gabe Amo": "A000380",
  "Ken Buck": "B001297",
  "Tommy Robinson": "R000354",
  "James Clyburn": "C000537",
  "James Inhofe": "I000024",
  "Maxwell Frost": "F000476",
  "Bill Johnson": "J000292",
  "Jack Reed": "R000122",
  "George Nethercutt": "N000051",
  "Grace Meng": "M001188",
  "Elijah Crane": "C001132",
  "David Cicilline": "C001084",
  "Orden Van": "V000135",
  "Marie Perez": "G000600",
  "Harriet Hageman": "H001096",
  "Becca Balint": "B001318",
  "Bob Good": "G000595",
  "Scott Fitzgerald": "F000471",
  "Thomas Tiffany": "T000165",
  "Carol Miller": "M001205",
  "Bryan Steil": "S001213",
  "Kim Schrier": "S001216",
  "Jennifer Wexton": "W000825",
  "Abigail Spanberger": "S001209",
  "Ben Cline": "C001118",
  "Pramila Jayapal": "J000298",
  "Alexander Mooney": "M001195",
  "Glenn Grothman": "G000576",
  "Dan Newhouse": "N000189",
  "Stacey Plaskett": "P000610",
  "Donald Beyer": "B001292",
  "Mark Pocan": "P000607",
  "Derek Kilmer": "K000381",
  "Suzan DelBene": "D000617",
  "H Griffith": "G000568",
  "Gerald Connolly": "C001078",
  "Adam Smith": "S000510",
  "Gwen Moore": "M001160",
  "Rodgers McMorris": "M001159",
  "Rick Larsen": "L000560",
  "Celeste Maloy": "M001228",
  "Jennifer McClellan": "M001227",
  "Keith Self": "S001224",
  "Andrew Ogles": "O000175",
  "Nathaniel Moran": "M001224",
  "Morgan Luttrell": "L000603",
  "Wesley Hunt": "H001095",
  "Russell Fry": "F000478",
  "Jasmine Crockett": "C001130",
  "Greg Casar": "C001131",
  "Jake Ellzey": "E000071",
  "Duyne Van": "V000134",
  "August Pfluger": "P000048",
  "Burgess Owens": "O000086",
  "Troy Nehls": "N000026",
  "Blake Moore": "M001213",
  "Nancy Mace": "M000194",
  "Ronny Jackson": "J000304",
  "Diana Harshbarger": "H001086",
  "Tony Gonzales": "G000594",
  "Pat Fallon": "F000246",
  "Colin Allred": "A000376",
  "Sylvia Garcia": "G000587",
  "Chip Roy": "R000614",
  "Veronica Escobar": "E000299",
  "Lizzie Fletcher": "F000468",
  "Lance Gooden": "G000589",
  "Dan Crenshaw": "C001120",
  "Mark Green": "G000545",
  "John Rose": "R000612",
  "Tim Burchett": "B001309",
  "Dusty Johnson": "J000301",
  "William Timmons": "T000480",
  "Michael Cloud": "C001115",
  "John Curtis": "C001114",
  "Ralph Norman": "N000190",
  "Jodey Arrington": "A000375",
  "Vicente Gonzalez": "G000581",
  "David Kustoff": "K000392",
  "Brian Babin": "B001291",
  "Marc Veasey": "V000131",
  "Roger Williams": "W000816",
  "Joaquin Castro": "C001091",
  "Randy Weber": "W000814",
  "Robert Wittman": "W000804",
  "Scott DesJarlais": "D000616",
  "Charles Fleischmann": "F000459",
  "Jeff Duncan": "D000615",
  "Steve Cohen": "C001068",
  "Pete Sessions": "S000250",
  "Kay Granger": "G000377",
  "Robert Scott": "S000185",
  "Henry Cuellar": "C001063",
  "Michael McCaul": "M001157",
  "Al Green": "G000553",
  "John Carter": "C001051",
  "Michael Burgess": "B001248",
  "Joe Wilson": "W000795",
  "Lloyd Doggett": "D000399",
  "Brandon Williams": "W000828",
  "Emilia Sykes": "S001223",
  "Andrea Salinas": "S001226",
  "Marcus Molinaro": "M001221",
  "Max Miller": "M001222",
  "Seth Magaziner": "M001223",
  "Summer Lee": "L000602",
  "Michael Lawler": "L000599",
  "Nicholas Langworthy": "L000600",
  "Greg Landsman": "L000601",
  "Val Hoyle": "H001094",
  "Christopher Deluzio": "D000530",
  "Lori Chavez-DeRemer": "C001135",
  "Josh Brecheen": "B001317",
  "Patrick Ryan": "R000579",
  "Shontel Brown": "B001313",
  "Jamaal Bowman": "B001223",
  "Stephanie Bice": "B000740",
  "Cliff Bentz": "B000668",
  "Guy Reschenthaler": "R000610",
  "John Joyce": "J000302",
  "Daniel Meuser": "M001204",
  "Chrissy Houlahan": "H001085",
  "Madeleine Dean": "D000631",
  "Susan Wild": "W000826",
  "Kevin Hern": "H001082",
  "Joseph Morelle": "M001206",
  "Mary Scanlon": "S001205",
  "Troy Balderson": "B001306",
  "Jenniffer González": "G000582",
  "Lloyd Smucker": "S001199",
  "Brian Fitzpatrick": "F000466",
  "Claudia Tenney": "T000478",
  "Dwight Evans": "E000296",
  "Warren Davidson": "D000626",
  "Brendan Boyle": "B001296",
  "Elise Stefanik": "S001196",
  "Matt Cartwright": "C001090",
  "Scott Perry": "P000605",
  "David Joyce": "J000295",
  "Joyce Beatty": "B001281",
  "Brad Wenstrup": "W000815",
  "Suzanne Bonamici": "B001278",
  "Robert Latta": "L000566",
  "Mike Kelly": "K000376",
  "Jim Jordan": "J000289",
  "Glenn Thompson": "T000467",
  "Paul Tonko": "T000469",
  "Earl Blumenauer": "B000574",
  "Frank Lucas": "L000491",
  "Tom Cole": "C001053",
  "Michael Turner": "T000463",
  "Marcy Kaptur": "K000009",
  "Gabe Vasquez": "V000136",
  "Wiley Nickel": "N000194",
  "Nick LaLota": "L000598",
  "Thomas Kean": "K000398",
  "Jeff Jackson": "J000308",
  "Daniel Goldman": "G000599",
  "Chuck Edwards": "E000246",
  "Anthony D'Esposito": "D000632",
  "Mike Flood": "F000474",
  "Melanie Stansbury": "S001218",
  "Ritchie Torres": "T000486",
  "Kathy Manning": "M001135",
  "Nicole Malliotakis": "M000317",
  "Fernandez Leger": "L000273",
  "Andrew Garbarino": "G000597",
  "Dan Bishop": "B001311",
  "Alexandria Ocasio-Cortez": "O000172",
  "Susie Lee": "L000590",
  "Mikie Sherrill": "S001207",
  "Andy Kim": "K000394",
  "Drew Van": "V000133",
  "Chris Pappas": "P000614",
  "Kelly Armstrong": "A000377",
  "Adriano Espaillat": "E000297",
  "Thomas Suozzi": "S001201",
  "Josh Gottheimer": "G000583",
  "Don Bacon": "B001298",
  "Coleman Watson": "W000822",
  "David Rouzer": "R000603",
  "Donald Norcross": "N000188",
  "Alma Adams": "A000370",
  "Hakeem Jeffries": "J000294",
  "Steven Horsford": "H001066",
  "Ann Kuster": "K000382",
  "Richard Hudson": "H001067",
  "Mark Amodei": "A000369",
  "Yvette Clarke": "C001067",
  "Adrian Smith": "S001172",
  "Dina Titus": "T000468",
  "Frank Pallone": "P000034",
  "Gregory Meeks": "M001137",
  "Nydia Velázquez": "V000081",
  "Christopher Smith": "S000522",
  "Jerrold Nadler": "N000002",
  "Patrick McHenry": "M001156",
  "Virginia Foxx": "F000450",
  "Shri Thanedar": "T000488",
  "Hillary Scholten": "S001221",
  "John James": "J000307",
  "Glenn Ivey": "I000058",
  "Valerie Foushee": "F000477",
  "Mike Ezell": "E000235",
  "Donald Davis": "D000230",
  "Eric Burlison": "B001316",
  "Mark Alford": "A000379",
  "Brad Finstad": "F000475",
  "Deborah Ross": "R000305",
  "Matthew Rosendale": "R000103",
  "Lisa McClain": "M001136",
  "Michelle Fischbach": "F000470",
  "Cori Bush": "B001224",
  "Jake Auchincloss": "A000148",
  "Gregory Murphy": "M001210",
  "Jared Golden": "G000592",
  "Michael Guest": "G000591",
  "Pete Stauber": "S001212",
  "Ilhan Omar": "O000173",
  "Dean Phillips": "P000616",
  "Angie Craig": "C001119",
  "Rashida Tlaib": "T000481",
  "Haley Stevens": "S001215",
  "Elissa Slotkin": "S001208",
  "David Trone": "T000483",
  "Ayanna Pressley": "P000617",
  "Lori Trahan": "T000482",
  "Jack Bergman": "B001301",
  "Jamie Raskin": "R000606",
  "Trent Kelly": "K000388",
  "Ryan Zinke": "Z000018",
  "Tom Emmer": "E000294",
  "Debbie Dingell": "D000624",
  "John Moolenaar": "M001194",
  "Seth Moulton": "M001196",
  "Katherine Clark": "C001101",
  "Ann Wagner": "W000812",
  "Daniel Kildee": "K000380",
  "Jason Smith": "S001195",
  "Bill Huizenga": "H001058",
  "Andy Harris": "H001052",
  "William Keating": "K000037",
  "Gregorio Sablan": "S001177",
  "Tim Walberg": "W000798",
  "John Sarbanes": "S001168",
  "Blaine Luetkemeyer": "L000569",
  "Chellie Pingree": "P000597",
  "James McGovern": "M000312",
  "Bennie Thompson": "T000193",
  "Richard Neal": "N000015",
  "Kweisi Mfume": "M000687",
  "Emanuel Cleaver": "C001061",
  "C Ruppersberger": "R000576",
  "Stephen Lynch": "L000562",
  "Sam Graves": "G000546",
  "Betty McCollum": "M001143",
  "Steny Hoyer": "H000874",
  "Jill Tokuda": "T000487",
  "Eric Sorensen": "S001225",
  "Delia Ramirez": "R000617",
  "Zachary Nunn": "N000193",
  "James Moylan": "M001219",
  "Morgan McGarvey": "M001220",
  "Richard McCormick": "M001218",
  "Jonathan Jackson": "J000309",
  "Erin Houchin": "H001093",
  "Mike Collins": "C001129",
  "Nikki Budzinski": "B001315",
  "Rudy Yakym": "Y000067",
  "Troy Carter": "C001125",
  "Julia Letlow": "L000595",
  "Victoria Spartz": "S000929",
  "Mariannette Miller-Meeks": "M001215",
  "Frank Mrvan": "M001214",
  "Mary Miller": "M001211",
  "Tracey Mann": "M000871",
  "Jake LaTurner": "L000266",
  "Ashley Hinson": "H001091",
  "Marjorie Greene": "G000596",
  "Randy Feenstra": "F000446",
  "Andrew Clyde": "C001116",
  "Sharice Davids": "D000629",
  "Greg Pence": "P000615",
  "James Baird": "B001307",
  "Lauren Underwood": "U000040",
  "Sean Casten": "C001117",
  "Jesüas Garceda": "G000586",
  "Russ Fulcher": "F000469",
  "Lucy McBath": "M001208",
  "Ron Estes": "E000298",
  "Mike Johnson": "J000299",
  "Clay Higgins": "H001077",
  "Jim Banks": "B001299",
  "Raja Krishnamoorthi": "K000391",
  "James Comer": "C001108",
  "Darin LaHood": "L000585",
  "Garret Graves": "G000577",
  "Mike Bost": "B001295",
  "Rick Allen": "A000372",
  "Barry Loudermilk": "L000583",
  "Andy Barr": "B001282",
  "Bradley Schneider": "S001190",
  "Thomas Massie": "M001184",
  "Larry Bucshon": "B001275",
  "Austin Scott": "S001189",
  "Mike Quigley": "Q000023",
  "Brett Guthrie": "G000558",
  "Steve Scalise": "S001176",
  "Bill Foster": "F000454",
  "André Carson": "C001072",
  "Robin Kelly": "K000385",
  "Michael Simpson": "S001148",
  "Janice Schakowsky": "S001145",
  "Danny Davis": "D000096",
  "Harold Rogers": "R000395",
  "David Scott": "S001157",
  "Ed Case": "C001055",
  "Brittany Pettersen": "P000620",
  "Jared Moskowitz": "M001217",
  "Cory Mills": "M001216",
  "Anna Luna": "L000596",
  "Laurel Lee": "L000597",
  "Robert Garcia": "G000047",
  "Yadira Caraveo": "C001134",
  "Aaron Bean": "B001314",
  "Sheila Cherfilus-McCormick": "C001127",
  "Young Kim": "K000397",
  "Nikema Williams": "W000788",
  "Michelle Steel": "S001135",
  "Maria Salazar": "S000168",
  "Sara Jacobs": "J000305",
  "Carlos Gimenez": "G000593",
  "C Franklin": "F000472",
  "Byron Donalds": "D000032",
  "Kat Cammack": "C001039",
  "Lauren Boebert": "B000825",
  "W Steube": "S001214",
  "Michael Waltz": "W000823",
  "Jahana Hayes": "H001081",
  "Jason Crow": "C001121",
  "Joe Neguse": "N000191",
  "Mike Levin": "L000593",
  "Katie Porter": "P000618",
  "A Ferguson": "F000465",
  "Brian Mast": "M001199",
  "Darren Soto": "S001200",
  "John Rutherford": "R000609",
  "Neal Dunn": "D000628",
  "Matt Gaetz": "G000578",
  "Rochester Blunt": "B001303",
  "J Correa": "C001110",
  "Nanette Barragán": "B001300",
  "Earl Carter": "C001103",
  "Lois Frankel": "F000462",
  "Scott Peters": "P000608",
  "Juan Vargas": "V000130",
  "Mark Takano": "T000472",
  "Frederica Wilson": "W000808",
  "Daniel Webster": "W000806",
  "Henry Johnson": "J000288",
  "Vern Buchanan": "B001260",
  "Kathy Castor": "C001066",
  "Gus Bilirakis": "B001257",
  "Joe Courtney": "C001069",
  "Doug Lamborn": "L000564",
  "Bill Posey": "P000599",
  "James Himes": "H001047",
  "John Larson": "L000557",
  "Diana DeGette": "D000197",
  "Maxine Waters": "W000187",
  "Sanford Bishop": "B000490",
  "Eleanor Norton": "N000147",
  "Schultz Wasserman": "W000797",
  "Mario Diaz-Balart": "D000600",
  "Darrell Issa": "I000056",
  "Ken Calvert": "C000059",
  "Rosa DeLauro": "D000216",
  "Kevin Kiley": "K000401",
  "Sydney Kamlager-Dove": "K000400",
  "John Duarte": "D000633",
  "Juan Ciscomani": "C001133",
  "Jay Obernolte": "O000019",
  "Mike Garcia": "G000061",
  "Josh Harder": "H001090",
  "Greg Stanton": "S001211",
  "Debbie Lesko": "L000589",
  "Jimmy Gomez": "G000585",
  "Salud Carbajal": "C001112",
  "Andy Biggs": "B001302",
  "Jimmy Panetta": "P000613",
  "Ro Khanna": "K000389",
  "Norma Torres": "T000474",
  "Ted Lieu": "L000582",
  "Pete Aguilar": "A000371",
  "Mark DeSaulnier": "D000623",
  "Ruben Gallego": "G000574",
  "Bruce Westerman": "W000821",
  "Aumua Radewagen": "R000600",
  "Tony Cárdenas": "C001097",
  "Julia Brownley": "B001285",
  "David Valadao": "V000129",
  "Eric Swalwell": "S001193",
  "Ami Bera": "B001287",
  "Jared Huffman": "H001068",
  "Doug LaMalfa": "L000578",
  "John Garamendi": "G000559",
  "Judy Chu": "C001080",
  "David Schweikert": "S001183",
  "Paul Gosar": "G000565",
  "Tom McClintock": "M001177",
  "Doris Matsui": "M001163",
  "Nancy Pelosi": "P000197",
  "Grace Napolitano": "N000179",
  "Mike Thompson": "T000460",
  "Brad Sherman": "S000344",
  "Barbara Lee": "L000551",
  "Jim Costa": "C001059",
  "Raüal Grijalva": "G000551",
  "Linda Sánchez": "S001156",
  "Adam Schiff": "S001150",
  "Anna Eshoo": "E000215",
  "Zoe Lofgren": "L000397",
  "Dale Strong": "S001220",
  "Mary Peltola": "P000619",
  "Jerry Carl": "C001054",
  "Barry Moore": "M001212",
  "J Hill": "H001072",
  "Gary Palmer": "P000609",
  "Steve Womack": "W000809",
  "Eric Crawford": "C001087",
  "Terri Sewell": "S001185",
  "Robert Aderholt": "A000055",
  "Mike Rogers": "R000572",
  "Kyrsten Sinema": "S001191",
  "Joe Manchin": "M001183",
  "Kevin McCarthy": "M001165",
  "John Hutchinson": "H001013",
  "Chris Cannon": "C000116",
  "Paul McCloskey": "M000343",
  "Brian Higgins": "H001038",
  "Peter Welch": "W000800",
  "J Vance": "V000137",
  "Eric Schmitt": "S001227",
  "Pete Ricketts": "R000618",
  "Markwayne Mullin": "M001190",
  "Mark Kelly": "K000377",
  "Cindy Hyde-Smith": "H001079",
  "John Fetterman": "F000479",
  "Laphonza Butler": "B001320",
  "Katie Britt": "B001319",
  "Ted Budd": "B001305",
  "John Hoeven": "H001061",
  "David Pryor": "P000556",
  "Austin Murphy": "M001088",
  "Bob Graham": "G000352",
  "Bill Gunter": "G000528",
  "Joseph Brennan": "B000798",
  "Bill Delahunt": "D000210",
  "Joseph Lieberman": "L000304",
  "Terry Everett": "E000268",
  "Todd Young": "Y000064",
  "Ron Wyden": "W000779",
  "Raphael Warnock": "W000790",
  "Elizabeth Warren": "W000817",
  "Sheldon Whitehouse": "W000802",
  "Mark Warner": "W000805",
  "Roger Wicker": "W000437",
  "Hollen Van": "V000128",
  "Tommy Tuberville": "T000278",
  "Tina Smith": "S001203",
  "Thomas Tillis": "T000476",
  "Dan Sullivan": "S001198",
  "Jon Tester": "T000464",
  "John Thune": "T000250",
  "Debbie Stabenow": "S000770",
  "Rick Scott": "S001217",
  "Brian Schatz": "S001194",
  "Tim Scott": "S001184",
  "Jeanne Shaheen": "S001181",
  "Charles Schumer": "S000148",
  "Bernard Sanders": "S000033",
  "Mitt Romney": "R000615",
  "Jacky Rosen": "R000608",
  "Mike Rounds": "R000605",
  "Marco Rubio": "R000595",
  "James Risch": "R000584",
  "Alex Padilla": "P000145",
  "Jon Ossoff": "O000174",
  "Rand Paul": "P000603",
  "Christopher Murphy": "M001169",
  "Gary Peters": "P000595",
  "Patty Murray": "M001111",
  "Lisa Murkowski": "M001153",
  "Roger Marshall": "M001198",
  "Jeff Merkley": "M001176",
  "Jerry Moran": "M000934",
  "Edward Markey": "M000133",
  "Mitch McConnell": "M000355",
  "John Kennedy": "K000393",
  "Angus King": "K000383",
  "Amy Klobuchar": "K000367",
  "Mike Lee": "L000577",
  "James Lankford": "L000575",
  "Cynthia Lummis": "L000571",
  "Ben Lujan": "L000570",
  "John Hickenlooper": "H000273",
  "Tim Kaine": "K000384",
  "Ron Johnson": "J000293",
  "Mazie Hirono": "H001042",
  "Martin Heinrich": "H001046",
  "Bill Hagerty": "H000601",
  "Josh Hawley": "H001089",
  "Margaret Hassan": "H001076",
  "Deb Fischer": "F000463",
  "Kirsten Gillibrand": "G000555",
  "Chuck Grassley": "G000386",
  "Lindsey Graham": "G000359",
  "Joni Ernst": "E000295",
  "Ted Cruz": "C001098",
  "Kevin Cramer": "C001096",
  "Steve Daines": "D000618",
  "Tammy Duckworth": "D000622",
  "Richard Durbin": "D000563",
  "Mike Crapo": "C000880",
  "Masto Cortez": "C001113",
  "Tom Cotton": "C001095",
  "Robert Casey": "C001070",
  "Christopher Coons": "C001088",
  "Bill Cassidy": "C001075",
  "Susan Collins": "C001035",
  "John Cornyn": "C001056",
  "Thomas Carper": "C000174",
  "Shelley Capito": "C001047",
  "Benjamin Cardin": "C000141",
  "Maria Cantwell": "C000127",
  "Sherrod Brown": "B000944",
  "Mike Braun": "B001310",
  "Richard Blumenthal": "B001277",
  "John Barrasso": "B001261",
  "Michael Bennet": "B001267",
  "Marsha Blackburn": "B001243",
  "John Boozman": "B001236",
  "Tammy Baldwin": "B001230",
  "A McEachin": "M001200",
  "George Santos": "S001222",
  "Chris Stewart": "S001192",
  "Jean Carnahan": "C001043",
  "Ronald Mottl": "M001044",
  "Frank Riggs": "R000252",
  "Eddie Johnson": "J000126",
  "Herb Kohl": "K000305",
  "Philip Hayes": "H000392",
  "Herbert Klein": "K000262",
  "James Johnson": "J000148",
  "Tom Bliley": "B000556",
  "Alton Waldon": "W000038",
  "Dianne Feinstein": "F000062",
  "Dave Durenberger": "D000566",
  "Dick Clark": "C000448",
  "Arlen Erdahl": "E000198",
  "Ed Weber": "W000235",
  "Lauch Faircloth": "F000437",
  "Bill Richardson": "R000229",
  "Don Sundquist": "S001075",
  "Albert Quie": "Q000010",
  "James Buckley": "B001026",
  "Lowell Weicker": "W000253",
  "Don Bonker": "B000620",
  "Tom Sawyer": "S000094",
  "Marion Berry": "B000420",
  "Charles Stenholm": "S000851",
  "Bud Shuster": "S000394",
  "Ronald Sarasin": "S000062",
  "L Bafalis": "B000029",
  "John Jenrette": "J000099",
  "Patricia Schroeder": "S000142",
  "Brian Donnelly": "D000416",
  "James Broyhill": "B000966",
  "John Olver": "O000085",
  "James Abourezk": "A000017",
  "Marie Newman": "N000192",
  "Peter Meijer": "M001186",
  "Kaiali'i Kahele": "K000396",
  "Mondaire Jones": "J000306",
  "Yvette Herrell": "H001084",
  "Madison Cawthorn": "C001104",
  "Carolyn Bourdeaux": "B001312",
  "Chris Jacobs": "J000020",
  "Fred Keller": "K000395",
  "Elaine Luria": "L000591",
  "Van Taylor": "T000479",
  "Anthony Gonzalez": "G000588",
  "Tom Malinowski": "M001203",
  "Cynthia Axne": "A000378",
  "Nicolas San": "S001204",
  "Conor Lamb": "L000588",
  "Liz Cheney": "C001109",
  "Anthony Brown": "B001304",
  "Trey Hollingsworth": "H001074",
  "Val Demings": "D000627",
  "Stephanie Murphy": "M001202",
  "Al Lawson": "L000586",
  "Tom O'Halleran": "O000171",
  "Ben Sasse": "S001197",
  "John Katko": "K000386",
  "Kathleen Rice": "R000602",
  "Lee Zeldin": "Z000017",
  "Brenda Lawrence": "L000581",
  "Jody Hice": "H001071",
  "Tom Rice": "R000597",
  "Sean Maloney": "M001185",
  "Jackie Walorski": "W000813",
  "Cheri Bustos": "B001286",
  "Rodney Davis": "D000619",
  "Alan Lowenthal": "L000579",
  "Jackie Speier": "S001175",
  "Albio Sires": "S001165",
  "Tom Reed": "R000585",
  "David McKinley": "M001180",
  "Beutler Herrera": "H001056",
  "Bob Gibbs": "G000563",
  "Steven Palazzo": "P000601",
  "Billy Long": "L000576",
  "Vicky Hartzler": "H001053",
  "Adam Kinzinger": "K000378",
  "Karen Bass": "B001270",
  "Mo Brooks": "B001274",
  "John Yarmuth": "Y000062",
  "Ed Perlmutter": "P000593",
  "Jerry McNerney": "M001166",
  "Kurt Schrader": "S001180",
  "Ann Kirkpatrick": "K000368",
  "Arthur Ravenel": "R000072",
  "David Price": "P000523",
  "Rob Portman": "P000449",
  "Patrick Toomey": "T000461",
  "Ron Kind": "K000188",
  "Kevin Brady": "B000755",
  "Roy Blunt": "B000575",
  "Don Young": "Y000033",
  "Fred Upton": "U000031",
  "Norman Shumway": "S000393",
  "Richard Shelby": "S000320",
  "Bobby Rush": "R000515",
  "Lucille Roybal-Allard": "R000486",
  "Carolyn Maloney": "M000087",
  "Patrick Leahy": "L000174",
  "Norris Cotton": "C000802",
  "Marlow Cook": "C000721",
  "Louie Gohmert": "G000552",
  "G Butterfield": "B001251",
  "Tim Ryan": "R000577",
  "James Langevin": "L000559",
  "Jim Cooper": "C000754",
  "Steve Chabot": "C000266",
  "Richard Burr": "B001135",
  "Michael Doyle": "D000482",
  "Peter DeFazio": "D000191",
  "Elliott Levitas": "L000265",
  "Jim Kolbe": "K000306",
  "Carroll Hubbard": "H000878",
  "Elwood Hillis": "H000624",
  "Andy Levin": "L000592",
  "Joseph Sempolinski": "S001219",
  "Mayra Flores": "F000473",
  "Connie Conway": "C001128",
  "Kelly Loeffler": "L000594",
  "Ron Wright": "W000827",
  "Antonio Delgado": "D000630",
  "Debra Haaland": "H001080",
  "Jim Hagedorn": "H001088",
  "Charlie Crist": "C001111",
  "Kamala Harris": "H001075",
  "Filemon Vela": "V000132",
  "Theodore Deutch": "D000610",
  "Steve Stivers": "S001187",
  "Cedric Richmond": "R000588",
  "Marcia Fudge": "F000455",
  "Jeff Fortenberry": "F000449",
  "Devin Nunes": "N000181",
  "Alcee Hastings": "H000324",
  "Kwanza Hall": "H001092",
  "George Goodling": "G000290",
  "Denver Riggleman": "R000611",
  "Ben McAdams": "M001209",
  "Joe Cunningham": "C001122",
  "Kendra Horn": "H001083",
  "Anthony Brindisi": "B001308",
  "Max Rose": "R000613",
  "Small Torres": "T000484",
  "Steve Watkins": "W000824",
  "Abby Finkenauer": "F000467",
  "Donna Shalala": "S001206",
  "Debbie Mucarsel-Powell": "M001207",
  "Ross Spano": "S001210",
  "Harley Rouda": "R000616",
  "Gilbert Cisneros": "C001123",
  "Katie Hill": "H001087",
  "TJ Cox": "C001124",
  "Brenda Jones": "J000303",
  "Doug Jones": "J000300",
  "Karen Handel": "H001078",
  "Greg Gianforte": "G000584",
  "Luther Strange": "S001202",
  "Thomas Garrett": "G000580",
  "Scott Taylor": "T000477",
  "John Faso": "F000464",
  "Ruben Kihuen": "K000390",
  "Jason Lewis": "L000587",
  "Paul Mitchell": "M001201",
  "Francis Rooney": "R000607",
  "Daniel Donovan": "D000625",
  "David Perdue": "P000612",
  "Evan Jenkins": "J000297",
  "Barbara Comstock": "C001105",
  "Mia Love": "L000584",
  "Will Hurd": "H001073",
  "John Ratcliffe": "R000601",
  "Ryan Costello": "C001106",
  "Steve Russell": "R000604",
  "Cresent Hardy": "H001070",
  "Thomas MacArthur": "M001193",
  "Brad Ashford": "A000373",
  "Mark Walker": "W000819",
  "David Trott": "T000475",
  "Mike Bishop": "B001293",
  "Bruce Poliquin": "P000611",
  "Ralph Abraham": "A000374",
  "David Young": "Y000066",
  "Rod Blum": "B001294",
  "Mark Takai": "T000473",
  "Carlos Curbelo": "C001107",
  "Gwen Graham": "G000575",
  "Mimi Walters": "W000820",
  "Stephen Knight": "K000387",
  "Martha McSally": "M001197",
  "Dave Brat": "B001290",
  "Curt Clawson": "C001102",
  "David Jolly": "J000296",
  "John Walsh": "W000818",
  "Bradley Byrne": "B001289",
  "Vance McAllister": "M001192",
  "Jeff Chiesa": "C001100",
  "Joseph Kennedy": "K000110",
  "Denny Heck": "H001064",
  "Pete Gallego": "G000572",
  "Beto O'Rourke": "O000170",
  "Keith Rothfus": "R000598",
  "Jim Bridenstine": "B001283",
  "Chris Collins": "C001092",
  "Grisham Lujan": "L000580",
  "George Holding": "H001065",
  "Mark Meadows": "M001187",
  "Robert Pittenger": "P000606",
  "William Cowan": "C001099",
  "Heidi Heitkamp": "H001069",
  "Kerry Bentivolio": "B001280",
  "John Delaney": "D000620",
  "Luke Messer": "M001189",
  "Susan Brooks": "B001284",
  "William Enyart": "E000292",
  "Tulsi Gabbard": "G000571",
  "Doug Collins": "C001093",
  "Joe Garcia": "G000573",
  "Trey Radel": "R000596",
  "Patrick Murphy": "M001168",
  "Ron DeSantis": "D000621",
  "Ted Yoho": "Y000065",
  "Elizabeth Esty": "E000293",
  "McLeod Negrete": "N000187",
  "Paul Cook": "C001094",
  "Ron Barber": "B001279",
  "Jane Harman": "H000213",
  "Mark Kirk": "K000360",
  "Denny Rehberg": "R000571",
  "Barack Obama": "O000167",
  "Donald Cazayoux": "C001073",
  "Bob Corker": "C001071",
  "Bobby Jindal": "J000287",
  "Jim Webb": "W000803",
  "Claire McCaskill": "M001170",
  "Gibbs Sekula": "S001166",
  "Anthony Weiner": "W000792",
  "Christopher Lee": "L000568",
  "Strom Thurmond": "T000254",
  "Kelly Ayotte": "A000368",
  "William Owens": "O000169",
  "Robert Turner": "T000471",
  "Janice Hahn": "H001063",
  "Marlin Stutzman": "S001188",
  "Carte Goodwin": "G000561",
  "Tom Graves": "G000560",
  "Charles Djou": "D000611",
  "Mark Critz": "C001081",
  "John Murtha": "M001120",
  "Scott Brown": "B001268",
  "Robert Wexler": "W000314",
  "George LeMieux": "L000572",
  "Kathleen Hochul": "H001062",
  "Mel Martinez": "M001162",
  "Al Franken": "F000457",
  "Ellen Tauscher": "T000057",
  "John McHugh": "M000472",
  "David Wu": "W000793",
  "Julia Carson": "C000191",
  "Reid Ribble": "R000587",
  "Sean Duffy": "D000614",
  "Robert Hurt": "H001060",
  "E Rigell": "R000589",
  "Blake Farenthold": "F000460",
  "Francisco Canseco": "C001082",
  "Bill Flores": "F000461",
  "Stephen Fincher": "F000458",
  "Diane Black": "B001273",
  "Kristi Noem": "N000184",
  "Mick Mulvaney": "M001182",
  "Trey Gowdy": "G000566",
  "Lou Barletta": "B001269",
  "Tom Marino": "M001179",
  "Patrick Meehan": "M001181",
  "James Renacci": "R000586",
  "Ann Buerkle": "B001276",
  "Richard Hanna": "H000164",
  "Christopher Gibson": "G000564",
  "Nan Hayworth": "H001054",
  "Michael Grimm": "G000569",
  "Joseph Heck": "H001055",
  "Jon Runyan": "R000594",
  "Frank Guinta": "G000570",
  "Rick Berg": "B001272",
  "Renee Ellmers": "E000291",
  "Alan Nunnelee": "N000186",
  "Chip Cravaack": "C001086",
  "Hansen Clarke": "C001085",
  "Justin Amash": "A000367",
  "Dan Benishek": "B001271",
  "Jeffrey Landry": "L000574",
  "Mike Pompeo": "P000602",
  "Kevin Yoder": "Y000063",
  "Tim Huelskamp": "H001057",
  "Todd Rokita": "R000592",
  "Robert Schilling": "S001182",
  "Randy Hultgren": "H001059",
  "Robert Dold": "D000613",
  "Joe Walsh": "W000811",
  "Raul Labrador": "L000573",
  "Colleen Hanabusa": "H001050",
  "Rob Woodall": "W000810",
  "David Rivera": "R000590",
  "Sandy Adams": "A000366",
  "Allen West": "W000807",
  "Dennis Ross": "R000593",
  "Richard Nugent": "N000185",
  "Steve Southerland": "S001186",
  "John Carney": "C001083",
  "Cory Gardner": "G000562",
  "Scott Tipton": "T000470",
  "Jeff Denham": "D000612",
  "Benjamin Quayle": "Q000024",
  "Tim Griffin": "G000567",
  "Martha Roby": "R000591",
  "Paul Kirk": "K000374",
  "Ken Salazar": "S001163",
  "Hillary Clinton": "C001041",
  "Laura Richardson": "R000581",
  "Paul Broun": "B001262",
  "Martin Meehan": "M000627",
  "Steve Kagen": "K000365",
  "David Davis": "D000606",
  "Christopher Carney": "C001065",
  "Joe Sestak": "S001169",
  "Jason Altmire": "A000362",
  "Mary Fallin": "F000453",
  "Zachary Space": "S001173",
  "Betty Sutton": "S001174",
  "Charles Wilson": "W000570",
  "Michael Arcuri": "A000363",
  "John Hall": "H001039",
  "Dean Heller": "H001041",
  "Paul Hodes": "H001043",
  "Carol Shea-Porter": "S001170",
  "Heath Shuler": "S001171",
  "Michele Bachmann": "B001256",
  "Keith Ellison": "E000288",
  "Timothy Walz": "W000799",
  "Nancy Boyda": "B001258",
  "Brad Ellsworth": "E000289",
  "Joe Donnelly": "D000607",
  "Phil Hare": "H001040",
  "Peter Roskam": "R000580",
  "Bill Sali": "S001167",
  "David Loebsack": "L000565",
  "Bruce Braley": "B001259",
  "Ron Klein": "K000366",
  "Tim Mahoney": "M001164",
  "Gabrielle Giffords": "G000554",
  "Harry Mitchell": "M001167",
  "Hilda Solis": "S001153",
  "Scott Murphy": "M001178",
  "Thomas Perriello": "P000600",
  "Glenn Nye": "N000183",
  "Jason Chaffetz": "C001076",
  "Pete Olson": "O000168",
  "David Roe": "R000582",
  "Pedro Pierluisi": "P000596",
  "Kathleen Dahlkemper": "D000608",
  "John Boccieri": "B001263",
  "Mary Kilroy": "K000372",
  "Steve Austria": "A000365",
  "Steve Driehaus": "D000609",
  "Eric Massa": "M001173",
  "Daniel Maffei": "M001171",
  "Michael McMahon": "M001174",
  "Harry Teague": "T000466",
  "Leonard Lance": "L000567",
  "John Adler": "A000364",
  "Larry Kissell": "K000369",
  "Gregg Harper": "H001045",
  "Erik Paulsen": "P000594",
  "Mark Schauer": "S001178",
  "Frank Kratovil": "K000371",
  "John Fleming": "F000456",
  "Anh Cao": "C001079",
  "Lynn Jenkins": "J000290",
  "Aaron Schock": "S001179",
  "Deborah Halvorson": "H001044",
  "Walter Minnick": "M001175",
  "Suzanne Kosmas": "K000370",
  "Thomas Rooney": "R000583",
  "Alan Grayson": "G000556",
  "Mike Coffman": "C001077",
  "Betsy Markey": "M001172",
  "Jared Polis": "P000598",
  "Duncan Hunter": "H000981",
  "Parker Griffith": "G000557",
  "Bobby Bright": "B001264",
  "Edward Kaufman": "K000373",
  "Roland Burris": "B001266",
  "Kay Hagan": "H001049",
  "Mike Johanns": "J000291",
  "Mark Begich": "B001265",
  "Donna Edwards": "E000290",
  "Travis Childers": "C001074",
  "Niki Tsongas": "T000465",
  "Tom DeLay": "D000217",
  "Brian Bilbray": "B000461",
  "John Campbell": "C001064",
  "Jean Schmidt": "S001164",
  "Robert Krueger": "K000333",
  "Mike DeWine": "D000294",
  "Thomas Daschle": "D000064",
  "Thomas Ridge": "R000243",
  "Frederick Richmond": "R000232",
  "John Rhodes": "R000189",
  "Mel Reynolds": "R000178",
  "Henry Reuss": "R000165",
  "Ogden Reid": "R000150",
  "Harry Reid": "R000146",
  "Ralph Regula": "R000141",
  "Thomas Rees": "R000134",
  "Richard Ray": "R000080",
  "William Ratchford": "R000067",
  "John Rarick": "R000065",
  "Charles Rangel": "R000053",
  "William Randall": "R000041",
  "Jim Ramstad": "R000033",
  "Thomas Railsback": "R000012",
  "Nick Rahall": "R000011",
  "George Radanovich": "R000004",
  "Jack Quinn": "Q000016",
  "James Quillen": "Q000013",
  "Dan Quayle": "Q000007",
  "Carl Pursell": "P000574",
  "Deborah Pryce": "P000555",
  "Joel Pritchard": "P000546",
  "Robert Price": "P000528",
  "Melvin Price": "P000522",
  "Richardson Preyer": "P000520",
  "Larry Pressler": "P000513",
  "Walter Powell": "P000485",
  "Glenn Poshard": "P000452",
  "John Porter": "P000444",
  "Earl Pomeroy": "P000422",
  "Richard Pombo": "P000419",
  "Bertram Podell": "P000399",
  "W Poage": "P000398",
  "Otis Pike": "P000348",
  "J Pickle": "P000328",
  "Owen Pickett": "P000326",
  "Peter Peyser": "P000280",
  "Shirley Pettis": "P000273",
  "Jerry Pettis": "P000272",
  "Thomas Petri": "P000265",
  "Douglas Peterson": "P000259",
  "Collin Peterson": "P000258",
  "Carl Perkins": "P000230",
  "Claude Pepper": "P000218",
  "Timothy Penny": "P000215",
  "Donald Pease": "P000170",
  "Lewis Payne": "P000152",
  "Bill Paxon": "P000148",
  "Ron Paul": "P000583",
  "Edward Pattison": "P000134",
  "Jerry Patterson": "P000121",
  "Elizabeth Patterson": "P000112",
  "Edward Patten": "P000106",
  "Wright Patman": "P000103",
  "William Patman": "P000104",
  "Ed Pastor": "P000099",
  "Otto Passman": "P000098",
  "Charles Pashayan": "P000097",
  "Stanford Parris": "P000080",
  "Mike Parker": "P000066",
  "Leon Panetta": "P000047",
  "Ron Packard": "P000005",
  "Michael Oxley": "O000163",
  "Wayne Owens": "O000156",
  "Major Owens": "O000159",
  "Richard Ottinger": "O000134",
  "Bill Orton": "O000108",
  "Solomon Ortiz": "O000107",
  "James Olin": "O000069",
  "David Obey": "O000007",
  "James Oberstar": "O000006",
  "Mary Oakar": "O000001",
  "Thomas O'Neill": "O000098",
  "James O'Hara": "O000055",
  "George O'Brien": "O000010",
  "Jim Nussle": "N000172",
  "Charles Norwood": "N000159",
  "Johnny Isakson": "I000055",
  "Jim DeMint": "D000595",
  "Joseph Crowley": "C001038",
  "Robin Hayes": "H001029",
  "Greg Walden": "W000791",
  "Mark Udall": "U000038",
  "Thomas Tancredo": "T000458",
  "John Sweeney": "S001149",
  "Don Sherwood": "S001146",
  "Thomas Reynolds": "R000569",
  "David Phelps": "P000584",
  "Doug Ose": "O000164",
  "Gary Miller": "M001139",
  "Steven Kuykendall": "K000357",
  "Stephanie Jones": "J000284",
  "Rush Holt": "H001032",
  "Joseph Hoeffel": "H001031",
  "Baron Hill": "H001030",
  "Judy Biggert": "B001232",
  "Shelley Berkley": "B001231",
  "George Voinovich": "V000126",
  "John Edwards": "E000286",
  "Evan Bayh": "B001233",
  "Peter Fitzgerald": "F000442",
  "David Vitter": "V000127",
  "Tom Udall": "U000039",
  "Lee Terry": "T000459",
  "Ronnie Shows": "S001147",
  "Michael Capuano": "C001037",
  "Ernie Fletcher": "F000441",
  "Ken Lucas": "L000558",
  "Dennis Moore": "M001140",
  "Paul Ryan": "R000570",
  "Brian Baird": "B001229",
  "Charles Gonzalez": "G000544",
  "Jeff Sessions": "S001141",
  "Chuck Hagel": "H001028",
  "Michael Enzi": "E000285",
  "Max Cleland": "C001034",
  "Heather Wilson": "W000789",
  "Robert Weygand": "W000315",
  "Jim Turner": "T000424",
  "John Tierney": "T000266",
  "John Sununu": "S001078",
  "Vic Snyder": "S000672",
  "Vince Snowbarger": "S000662",
  "John Shimkus": "S000364",
  "Bob Schaffer": "S000112",
  "Max Sandlin": "S000044",
  "Loretta Sanchez": "S000030",
  "Jim Ryun": "R000566",
  "Steven Rothman": "R000462",
  "James Rogan": "R000386",
  "Ciro Rodriguez": "R000568",
  "Bob Riley": "R000258",
  "Silvestre Reyes": "R000170",
  "Bill Redmond": "R000567",
  "Joseph Pitts": "P000373",
  "Charles Pickering": "P000323",
  "John Peterson": "P000263",
  "Edward Pease": "P000171",
  "Michael Pappas": "P000049",
  "Anne Northup": "N000143",
  "Mike McIntyre": "M000485",
  "Carolyn McCarthy": "M000309",
  "James Maloney": "M000090",
  "Nick Lampson": "L000043",
  "Dennis Kucinich": "K000336",
  "Carolyn Kilpatrick": "K000180",
  "Jay Johnson": "J000149",
  "Christopher John": "J000110",
  "William Jenkins": "J000082",
  "Asa Hutchinson": "H001014",
  "Kenny Hulshof": "H000948",
  "Darlene Hooley": "H000762",
  "Ruben Hinojosa": "H000636",
  "Rick Hill": "H000605",
  "Virgil Goode": "G000280",
  "Jim Gibbons": "G000152",
  "Vito Fossella": "F000440",
  "Harold Ford": "F000261",
  "Bob Etheridge": "E000226",
  "Jo Emerson": "E000172",
  "Jim Davis": "D000114",
  "John Cooksey": "C000735",
  "Merrill Cook": "C000722",
  "Donna Christensen": "C000380",
  "Walter Capps": "C000134",
  "Lois Capps": "C001036",
  "Robert Brady": "B001227",
  "Allen Boyd": "B000716",
  "Leonard Boswell": "B000652",
  "Mack Bono": "B001228",
  "Rod Blagojevich": "B000518",
  "Thomas Allen": "A000357",
  "Edward Zorinsky": "Z000013",
  "Milton Young": "Y000047",
  "Harris Wofford": "W000665",
  "Pete Wilson": "W000607",
  "Harrison Williams": "W000502",
  "Paul Wellstone": "W000288",
  "Malcolm Wallop": "W000092",
  "John Tunney": "T000410",
  "John Tower": "T000322",
  "Fred Thompson": "T000457",
  "Lloyd Bentsen": "B000401",
  "Wallace Bennett": "B000384",
  "Robert Bennett": "B000382",
  "Henry Bellmon": "B000351",
  "J Beall": "B000272",
  "Birch Bayh": "B000254",
  "Dewey Bartlett": "B000200",
  "Howard Baker": "B000063",
  "John Ashcroft": "A000356",
  "Wendell Anderson": "A000202",
  "Maryon Allen": "A000139",
  "James Allen": "A000127",
  "George Aiken": "A000062",
  "Spencer Abraham": "A000355",
  "John Zwach": "Z000016",
  "Edwin Zschau": "Z000014",
  "Roger Zion": "Z000010",
  "Dick Zimmer": "Z000008",
  "William Zeliff": "Z000004",
  "Leo Zeferetti": "Z000002",
  "Clement Zablocki": "Z000001",
  "Samuel Young": "Y000052",
  "Robert Young": "Y000051",
  "John Young": "Y000043",
  "Edward Young": "Y000035",
  "C Young": "Y000031",
  "Andrew Young": "Y000028",
  "Gus Yatron": "Y000014",
  "Sidney Yates": "Y000013",
  "Albert Wynn": "W000784",
  "Louis Wyman": "W000782",
  "Chalmers Wylie": "W000781",
  "John Wydler": "W000780",
  "Wendell Wyatt": "W000778",
  "Joe Wyatt": "W000777",
  "James Wright": "W000763",
  "George Wortley": "W000752",
  "Lynn Woolsey": "W000738",
  "Pat Won": "W000686",
  "Howard Wolpe": "W000682",
  "Lester Wolff": "W000680",
  "Frank Wolf": "W000672",
  "Robert Wise": "W000654",
  "Timothy Wirth": "W000647",
  "Larry Winn": "W000636",
  "Robert Wilson": "W000610",
  "Pat Williams": "W000520",
  "Lyle Williams": "W000528",
  "Lawrence Williams": "W000525",
  "Charles Wiggins": "W000448",
  "William Widnall": "W000445",
  "Jamie Whitten": "W000428",
  "Bob Whittaker": "W000426",
  "Charles Whitley": "W000419",
  "Ed Whitfield": "W000413",
  "G Whitehurst": "W000406",
  "Rick White": "W000391",
  "Richard White": "W000390",
  "Alan Wheat": "W000326",
  "Charles Whalen": "W000317",
  "Jerry Weller": "W000273",
  "Dave Weldon": "W000267",
  "Curt Weldon": "W000268",
  "Ted Weiss": "W000258",
  "Vin Weber": "W000237",
  "James Weaver": "W000227",
  "Henry Waxman": "W000215",
  "J Watts": "W000210",
  "Melvin Watt": "W000207",
  "Wes Watkins": "W000194",
  "Harold Washington": "W000180",
  "Craig Washington": "W000177",
  "John Ware": "W000147",
  "Mike Ward": "W000139",
  "William Wampler": "W000121",
  "Zach Wamp": "W000119",
  "William Walsh": "W000107",
  "James Walsh": "W000099",
  "Robert Walker": "W000068",
  "Doug Walgren": "W000044",
  "Jerome Waldie": "W000035",
  "Enid Waldholtz": "G000408",
  "Joe Waggonner": "W000018",
  "Barbara Vucanovich": "V000124",
  "Harold Volkmer": "V000112",
  "Peter Visclosky": "V000108",
  "Joseph Vigorito": "V000098",
  "Victor Veysey": "V000093",
  "Charles Vanik": "V000047",
  "Tommy Vandergriff": "V000026",
  "Veen Vander": "V000029",
  "Jagt Vander": "V000027",
  "Deerlin Van": "V000024",
  "Tim Valentine": "V000006",
  "Jolene Unsoeld": "U000017",
  "Robert Underwood": "U000014",
  "Al Ullman": "U000004",
  "Morris Udall": "U000001",
  "Walter Tucker": "T000405",
  "James Tucker": "T000400",
  "Paul Tsongas": "T000393",
  "Paul Trible": "T000367",
  "David Treen": "T000362",
  "Bob Traxler": "T000356",
  "James Traficant": "T000350",
  "Edolphus Towns": "T000326",
  "David Towell": "T000321",
  "Robert Torricelli": "T000317",
  "Estaban Torres": "T000316",
  "Peter Torkildsen": "T000314",
  "Richard Tonry": "T000310",
  "Robert Tiernan": "T000265",
  "Todd Tiahrt": "T000260",
  "Karen Thurman": "T000253",
  "Ray Thornton": "T000243",
  "Mac Thornberry": "T000238",
  "Charles Thone": "T000234",
  "Vernon Thomson": "T000233",
  "Frank Thompson": "T000200",
  "Lindsay Thomas": "T000184",
  "Craig Thomas": "T000162",
  "William Thomas": "T000188",
  "Frank Tejeda": "T000113",
  "Olin Teague": "T000110",
  "Charles Teague": "T000109",
  "Roy Taylor": "T000099",
  "G Taylor": "T000075",
  "Gene Taylor": "T000074",
  "Charles Taylor": "T000067",
  "W Tauzin": "T000058",
  "Thomas Tauke": "T000053",
  "Randy Tate": "T000048",
  "John Tanner": "T000038",
  "Robert Tallon": "T000034",
  "Jim Talent": "T000024",
  "Burt Talcott": "T000022",
  "Mike Synar": "S001139",
  "James Symington": "S001134",
  "Patrick Swindall": "S001122",
  "Al Swift": "S001115",
  "Dick Swett": "S001113",
  "David Sweeney": "S001101",
  "Foto Sunia": "S001077",
  "Leonor Sullivan": "S001057",
  "Bart Stupak": "S001045",
  "Bob Stump": "S001044",
  "Gerry Studds": "S001040",
  "W Stuckey": "S001039",
  "Frank Stubblefield": "S001037",
  "Ted Strickland": "S001004",
  "Samuel Stratton": "S000997",
  "Michael Strang": "S000991",
  "Louis Stokes": "S000948",
  "Steve Stockman": "S000937",
  "David Stockman": "S000935",
  "Bennett Stewart": "S000902",
  "Robert Stephens": "S000860",
  "William Steiger": "S000847",
  "Sam Steiger": "S000846",
  "Newton Steers": "S000844",
  "Alan Steelman": "S000841",
  "Robert Steele": "S000836",
  "Tom Steed": "S000829",
  "Cliff Stearns": "S000822",
  "David Staton": "S000818",
  "Fortney Stark": "S000810",
  "James Stanton": "S000803",
  "J Stanton": "S000804",
  "Arlan Stangeland": "S000795",
  "Richard Stallings": "S000785",
  "Harley Staggers": "S000779",
  "Edward Stack": "S000772",
  "Germain St": "S000762",
  "John Spratt": "S000749",
  "Floyd Spence": "S000718",
  "Gladys Spellman": "S000716",
  "Mark Souder": "S001143",
  "Gerald Solomon": "S000675",
  "Stephen Solarz": "S000673",
  "M Snyder": "S000669",
  "Olympia Snowe": "S000663",
  "Virginia Smith": "S000622",
  "Robert Smith": "S000607",
  "Bob Smith": "S000606",
  "Peter Smith": "S000601",
  "Nick Smith": "S000597",
  "Neal Smith": "S000596",
  "Linda Smith": "S000587",
  "Lawrence Smith": "S000586",
  "Larkin Smith": "S000584",
  "Lamar Smith": "S000583",
  "Joseph Smith": "S000579",
  "Henry Smith": "S000548",
  "Denny Smith": "S000527",
  "Albert Smith": "S000514",
  "Louise Slaughter": "S000480",
  "D Slaughter": "S000479",
  "Jim Slattery": "S000477",
  "John Slack": "S000473",
  "Joe Skubitz": "S000472",
  "Ike Skelton": "S000465",
  "Joe Skeen": "S000463",
  "David Skaggs": "S000462",
  "B Sisk": "S000454",
  "Norman Sisisky": "S000453",
  "Paul Simon": "S000423",
  "Mark Siljander": "S000409",
  "Gerry Sikorski": "S000407",
  "Robert Sikes": "S000406",
  "Garner Shriver": "S000388",
  "Dick Shoup": "S000383",
  "George Shipley": "S000367",
  "Karen Shepherd": "S000332",
  "Christopher Shays": "S001144",
  "E Shaw": "S000303",
  "Philip Sharp": "S000294",
  "James Shannon": "S000286",
  "Bob Shamansky": "S000282",
  "John Shadegg": "S000275",
  "Jose Serrano": "S000248",
  "F Sensenbrenner": "S000244",
  "John Seiberling": "S000230",
  "Keith Sebelius": "S000217",
  "Andrea Seastrand": "S000213",
  "Richard Schulze": "S000146",
  "Bill Schuette": "S000143",
  "Claudine Schneider": "S000136",
  "Herman Schneebeli": "S000135",
  "Steven Schiff": "S000125",
  "James Scheuer": "S000124",
  "William Scherle": "S000121",
  "Lynn Schenk": "S000119",
  "Dan Schaefer": "S000109",
  "Joe Scarborough": "S000106",
  "John Saylor": "S000102",
  "Jim Saxton": "S000097",
  "Harold Sawyer": "S000087",
  "Gus Savage": "S000081",
  "David Satterfield": "S000070",
  "Bill Sarpalius": "S000066",
  "Paul Sarbanes": "S000064",
  "Rick Santorum": "S000059",
  "James Santini": "S000058",
  "George Sangmeister": "S000056",
  "Mark Sanford": "S000051",
  "Charles Sandman": "S000045",
  "Matt Salmon": "S000018",
  "Patricia Saiki": "S000014",
  "Martin Sabo": "S000005",
  "Leo Ryan": "R000558",
  "Earl Ruth": "R000545",
  "Martin Russo": "R000543",
  "Philip Ruppe": "R000512",
  "Harold Runnels": "R000510",
  "Eldon Rudd": "R000495",
  "William Royer": "R000489",
  "Edward Royce": "R000487",
  "Edward Roybal": "R000485",
  "William Roy": "R000484",
  "John Rowland": "R000482",
  "J Rowland": "R000481",
  "John Rousselot": "R000469",
  "J Roush": "R000467",
  "Marge Roukema": "R000465",
  "Toby Roth": "R000459",
  "Dan Rostenkowski": "R000458",
  "Benjamin Rosenthal": "R000442",
  "Charlie Rose": "R000436",
  "Ileana Ros-Lehtinen": "R000435",
  "John Rooney": "R000424",
  "Fred Rooney": "R000423",
  "Angelo Roncallo": "R000422",
  "Teno Roncalio": "R000421",
  "Carlos Romero-Barcelo": "R000417",
  "Dana Rohrabacher": "R000409",
  "Paul Rogers": "R000401",
  "Tim Roemer": "R000385",
  "Buddy Roemer": "R000384",
  "Robert Roe": "R000383",
  "Peter Rodino": "R000374",
  "Howard Robison": "R000357",
  "J Robinson": "R000337",
  "Ray Roberts": "R000312",
  "Pat Roberts": "R000307",
  "Clint Roberts": "R000308",
  "Lynn Rivers": "R000281",
  "Don Ritter": "R000277",
  "Theodore Risenhoover": "R000268",
  "Matthew Rinaldo": "R000262",
  "Donald Riegle": "R000249",
  "Jack Brinkley": "B000839",
  "Bill Brewster": "B000817",
  "John Breckinridge": "B000788",
  "John Breaux": "B000780",
  "William Bray": "B000778",
  "Frank Brasco": "B000771",
  "John Brademas": "B000736",
  "Barbara Boxer": "B000711",
  "David Bowen": "B000682",
  "Beau Boulter": "B000666",
  "Rick Boucher": "B000657",
  "Douglas Bosco": "B000648",
  "Robert Borski": "B000644",
  "Sonny Bono": "B000622",
  "David Bonior": "B000619",
  "Henry Bonilla": "B000617",
  "William Boner": "B000615",
  "Richard Bolling": "B000605",
  "Edward Boland": "B000600",
  "Corinne Boggs": "B000592",
  "John Boehner": "B000589",
  "Sherwood Boehlert": "B000586",
  "Peter Blute": "B000576",
  "Michael Blouin": "B000567",
  "Ben Blaz": "B000551",
  "John Blatnik": "B000550",
  "James Blanchard": "B000538",
  "Lucien Blackwell": "B000517",
  "Ben Blackburn": "B000506",
  "Jonathan Bingham": "B000472",
  "Michael Bilirakis": "B000463",
  "James Bilbray": "B000462",
  "Edward Biester": "B000451",
  "Mario Biaggi": "B000432",
  "Tom Bevill": "B000431",
  "Ed Bethune": "B000422",
  "Howard Berman": "B000410",
  "Bob Bergland": "B000408",
  "Doug Bereuter": "B000403",
  "Bill Nelson": "N000032",
  "Ancher Nelsen": "N000028",
  "James Nelligan": "N000027",
  "Lucien Nedzi": "N000019",
  "Stephen Neal": "N000016",
  "William Natcher": "N000009",
  "John Napier": "N000005",
  "Dave Nagle": "N000003",
  "Sue Myrick": "M001134",
  "Michael Myers": "M001132",
  "John Myers": "M001130",
  "Gary Myers": "M001128",
  " Musto": "M001123",
  "Morgan Murphy": "M001101",
  "John Murphy": "M001098",
  "Robert Mrazek": "M001057",
  "John Moss": "M001035",
  "Charles Mosher": "M001031",
  "Sid Morrison": "M000999",
  "Bruce Morrison": "M000992",
  "Thomas Morgan": "M000958",
  "Constance Morella": "M000941",
  "James Moran": "M000933",
  "William Moorhead": "M000930",
  "Carlos Moorhead": "M000926",
  "W Moore": "M000923",
  "Jim Moody": "M000881",
  "G Montgomery": "M000865",
  "David Monson": "M000860",
  "Robert Mollohan": "M000845",
  "Alan Mollohan": "M000844",
  "Susan Molinari": "M000843",
  "Guy Molinari": "M000842",
  "Toby Moffett": "M000839",
  "John Moakley": "M000834",
  "Wilmer Mizell": "M000833",
  "Parren Mitchell": "M000826",
  "Donald Mitchell": "M000808",
  "William Minshall": "M000799",
  "Patsy Mink": "M000797",
  "Joseph Minish": "M000796",
  "David Minge": "M000795",
  "Norman Mineta": "M000794",
  "William Mills": "M000779",
  "Wilbur Mills": "M000778",
  "John Miller": "M000736",
  "George Miller": "M000725",
  "Dan Miller": "M000720",
  "Clarence Miller": "M000718",
  "Juanita Millender-McDonald": "M000714",
  "Dale Milford": "M000708",
  "Abner Mikva": "M000703",
  "Barbara Mikulski": "M000702",
  "Robert Michel": "M000692",
  "John Mica": "M000689",
  "Daniel Mica": "M000688",
  "Marjorie Margolies-Mezvinsky": "M000129",
  "Edward Mezvinsky": "M000686",
  "Helen Meyner": "M000685",
  "Jan Meyers": "M000684",
  "Ralph Metcalfe": "M000675",
  "Jack Metcalf": "M000669",
  "John Melcher": "M000635",
  "Carrie Meek": "M000628",
  "Lloyd Meeds": "M000626",
  "Clem McSpadden": "M000603",
  "Michael McNulty": "M000590",
  "James McNulty": "M000589",
  "Thomas McMillen": "M000573",
  "J McMillan": "M000566",
  "Stewart McKinney": "M000527",
  "Cynthia McKinney": "M000523",
  "John McKernan": "M000512",
  "Howard McKeon": "M000508",
  "K McKay": "M000490",
  "David McIntosh": "M000481",
  "Scott McInnis": "M000477",
  "Matthew McHugh": "M000473",
  "Paul McHale": "M000466",
  "Raymond McGrath": "M000458",
  "John McFall": "M000436",
  "Robert McEwen": "M000433",
  "Bob McEwen": "M000432",
  "Lawrence McDonald": "M000413",
  "Jim McDermott": "M000404",
  "Joseph McDade": "M000399",
  "Dave McCurdy": "M000398",
  "Jim McCrery": "M000388",
  "Mike McCormack": "M000365",
  "Bill McCollum": "M000350",
  "John McCollister": "M000349",
  "Frank McCloskey": "M000342",
  "Robert McClory": "M000340",
  "Karen McCarthy": "M000316",
  "Alfred McCandless": "M000306",
  "John McCain": "M000303",
  "Romano Mazzoli": "M000291",
  "Wiley Mayne": "M000286",
  "Nicholas Mavroules": "M000264",
  "James Mattox": "M000260",
  "Spark Matsunaga": "M000250",
  "Robert Matsui": "M000249",
  "Dawson Mathis": "M000244",
  "Robert Mathias": "M000242",
  "Frank Mascara": "M000212",
  "William Martini": "M000207",
  "Matthew Martinez": "M000206",
  "Lynn Martin": "M000195",
  "James Martin": "M000183",
  "David Martin": "M000174",
  "David Marriott": "M000143",
  "Ron Marlenee": "M000139",
  "Marc Marks": "M000136",
  "Joseph Maraziti": "M000121",
  "Donald Manzullo": "M001138",
  "Thomas Manton": "M000117",
  "James Mann": "M000105",
  "David Mann": "M000100",
  "Richard Mallary": "M000078",
  "William Mailliard": "M000070",
  "George Mahon": "M000065",
  "Andrew Maguire": "M000058",
  "Edward Madigan": "M000041",
  "Ray Madden": "M000039",
  "Buddy MacKay": "M000023",
  "Connie Mack": "M001155",
  "Ronald Machtley": "M000015",
  "Torbert Macdonald": "M000005",
  "Bill Luther": "L000521",
  "Daniel Lungren": "L000517",
  "Stanley Lundine": "L000516",
  "Donald Lukens": "L000509",
  "Charles Luken": "L000507",
  "Thomas Luken": "L000508",
  "Manuel Lujan": "L000506",
  "Mike Lowry": "L000486",
  "Nita Lowey": "L000480",
  "Bill Lowery": "L000479",
  "Trent Lott": "L000447",
  "James Longley": "L000431",
  "Jill Long": "L000420",
  "Herman Talmadge": "T000035",
  "Robert Taft": "T000010",
  "Stuart Symington": "S001136",
  "Richard Stone": "S000962",
  "Donald Stewart": "S000907",
  "Adlai Stevenson": "S000890",
  "Ted Stevens": "S000888",
  "John Stennis": "S000852",
  "Robert Stafford": "S000776",
  "Arlen Specter": "S000709",
  "John Sparkman": "S000701",
  "Alan Simpson": "S000429",
  "John Seymour": "S000269",
  "William Scott": "S000189",
  "Hugh Scott": "S000174",
  "Richard Schweiker": "S000159",
  "Harrison Schmitt": "S000132",
  "William Saxbe": "S000096",
  "Terry Sanford": "S000055",
  "Warren Rudman": "R000497",
  "Jr Roth": "R000460",
  "John Rockefeller": "R000361",
  "Charles Robb": "R000295",
  "Abraham Ribicoff": "R000191",
  "Jennings Randolph": "R000046",
  "William Proxmire": "P000553",
  "Charles Percy": "P000222",
  "Claiborne Pell": "P000193",
  "James Pearson": "P000166",
  "John Pastore": "P000100",
  "Bob Packwood": "P000009",
  "Sam Nunn": "N000171",
  "Don Nickles": "N000102",
  "Gaylord Nelson": "N000033",
  "Edmund Muskie": "M001121",
  "Frank Murkowski": "M001085",
  "Daniel Moynihan": "M001054",
  "Frank Moss": "M001033",
  "Carol Moseley-Braun": "M001025",
  "Robert Morgan": "M000956",
  "Joseph Montoya": "M000876",
  "Walter Mondale": "M000851",
  "George Mitchell": "M000811",
  "Howard Metzenbaum": "M000678",
  "Lee Metcalf": "M000671",
  "Thomas McIntyre": "M000486",
  "George McGovern": "M000452",
  "Gale McGee": "M000445",
  "James McClure": "M000346",
  "John McClellan": "M000332",
  "Mack Mattingly": "M000257",
  "Charles Mathias": "M000241",
  "Harlan Mathews": "M000236",
  "Mike Mansfield": "M000113",
  "Warren Magnuson": "M000053",
  "Richard Lugar": "L000504",
  "Russell Long": "L000428",
  "Carl Levin": "L000261",
  "Paul Laxalt": "L000148",
  "Frank Lautenberg": "L000123",
  "John Kerry": "K000148",
  "J Kerrey": "K000146",
  "Edward Kennedy": "K000105",
  "Dirk Kempthorne": "K000088",
  "Nancy Kassebaum": "K000017",
  "David Karnes": "K000011",
  "J Johnston": "J000189",
  "Roger Jepsen": "J000101",
  "Jacob Javits": "J000064",
  "Henry Jackson": "J000013",
  "Daniel Inouye": "I000025",
  "Kay Hutchison": "H001016",
  "Muriel Humphrey": "H000956",
  "Hubert Humphrey": "H000953",
  "Gordon Humphrey": "H000951",
  "Harold Hughes": "H000922",
  "Walter Huddleston": "H000905",
  "Roman Hruska": "H000875",
  "Ernest Hollings": "H000725",
  "Kaneaster Hodges": "H000675",
  "Jesse Helms": "H000463",
  "Howell Heflin": "H000445",
  "Chic Hecht": "H000439",
  "Samuel Hayakawa": "H000384",
  "Paula Hawkins": "H000374",
  "William Hathaway": "H000346",
  "Paul Hatfield": "H000344",
  "Mark Hatfield": "H000343",
  "Orrin Hatch": "H000338",
  "Floyd Haskell": "H000317",
  "Vance Hartke": "H000297",
  "Philip Hart": "H000291",
  "Gary Hart": "H000287",
  "Clifford Hansen": "H000170",
  "Edward Gurney": "G000531",
  "Robert Griffin": "G000465",
  "Mike Gravel": "G000388",
  "Slade Gorton": "G000333",
  "Barry Goldwater": "G000268",
  "John Glenn": "G000236",
  "E Garn": "G000072",
  "James Fulbright": "F000401",
  "William Frist": "F000439",
  "Sheila Frahm": "F000438",
  "Wendell Ford": "F000268",
  "Hiram Fong": "F000245",
  "Russell Feingold": "F000061",
  "Paul Fannin": "F000013",
  "J Exon": "E000284",
  "Sam Ervin": "E000211",
  "James Eastland": "E000018",
  "John East": "E000017",
  "Thomas Eagleton": "E000004",
  "John Durkin": "D000574",
  "Peter Dominick": "D000409",
  "Pete Domenici": "D000407",
  "Robert Dole": "D000401",
  "Alan Dixon": "D000366",
  "Jeremiah Denton": "D000259",
  "Dennis DeConcini": "D000185",
  "John Danforth": "D000030",
  "Alfonse D'Amato": "D000018",
  "Carl Curtis": "C001006",
  "Alan Cranston": "C000877",
  "Paul Coverdell": "C000813",
  "Kent Conrad": "C000705",
  "Richard Nolan": "N000127",
  "Robert Nix": "N000113",
  "Howard Nielson": "N000106",
  "Dick Nichols": "N000094",
  "Bill Nichols": "N000095",
  "Robert Ney": "N000081",
  "Mark Neumann": "N000054",
  "Thad Cochran": "C000567",
  "Frank Church": "C000388",
  "Lawton Chiles": "C000356",
  "John Chafee": "C000269",
  "Clifford Case": "C000220",
  "Howard Cannon": "C000120",
  "Harry Byrd": "B001209",
  "Robert Byrd": "B001210",
  "Conrad Burns": "B001126",
  "Quentin Burdick": "B001077",
  "Jocelyn Burdick": "B001076",
  "Dale Bumpers": "B001057",
  "Richard Bryan": "B000993",
  "Edward Brooke": "B000871",
  "Bill Brock": "B000851",
  "Nicholas Brady": "B000756",
  "Bill Bradley": "B001225",
  "Rudy Boschwitz": "B000647",
  "David Boren": "B000639",
  "Christopher Bond": "B000611",
  "Jeff Bingaman": "B000468",
  "Joseph Biden": "B000444",
  "Alan Bible": "B000436",
  "John Warner": "W000154",
  "Gordon Smith": "S001142",
  "Blanche Lincoln": "L000035",
  "Mary Landrieu": "L000550",
  "David Reichert": "R000578",
  "Thelma Drake": "D000605",
  "Kenny Marchant": "M001158",
  "K Conaway": "C001062",
  "Ted Poe": "P000592",
  "Luis Fortuno": "F000452",
  "Charles Dent": "D000604",
  "Allyson Schwartz": "S001162",
  "Michael Fitzpatrick": "F000451",
  "Dan Boren": "B001254",
  "John Kuhl": "K000364",
  "Russ Carnahan": "C001060",
  "John Schwarz": "S001161",
  "Charles Boustany": "B001255",
  "Charlie Melancon": "M001161",
  "Geoff Davis": "D000603",
  "Michael Sodrel": "S001160",
  "Melissa Bean": "B001253",
  "Daniel Lipinski": "L000563",
  "John Barrow": "B001252",
  "Lynn Westmoreland": "W000796",
  "Tom Price": "P000591",
  "John Salazar": "S001158",
  "Sandlin Herseth": "H001037",
  "Ben Chandler": "C001058",
  "Rob Bishop": "B001250",
  "Chris Bell": "B001241",
  "Jeb Hensarling": "H001036",
  "Lincoln Davis": "D000599",
  "William Janklow": "J000286",
  "J Barrett": "B001239",
  "Tim Murphy": "M001151",
  "Jim Gerlach": "G000549",
  "Timothy Bishop": "B001242",
  "Jon Porter": "P000589",
  "Stevan Pearce": "P000588",
  "Scott Garrett": "G000548",
  "Jeb Bradley": "B001246",
  "Brad Miller": "M001154",
  "Frank Ballance": "B001238",
  "John Kline": "K000363",
  "Thaddeus McCotter": "M001147",
  "Candice Miller": "M001150",
  "Michael Michaud": "M001149",
  "Rodney Alexander": "A000361",
  "Chris Chocola": "C001052",
  "Rahm Emanuel": "E000287",
  "Steve King": "K000362",
  "Madeleine Bordallo": "B001245",
  "Max Burns": "B001249",
  "Phil Gingrey": "G000550",
  "Denise Majette": "M001145",
  "Jim Marshall": "M001146",
  "Tom Feeney": "F000447",
  "Kendrick Meek": "M001148",
  "Katherine Harris": "H001035",
  "Ginny Brown-Waite": "B001247",
  "Bob Beauprez": "B001240",
  "Marilyn Musgrave": "M001152",
  "Dennis Cardoza": "C001050",
  "Trent Franks": "F000448",
  "Rick Renzi": "R000574",
  "Artur Davis": "D000602",
  "Jo Bonner": "B001244",
  "Mark Pryor": "P000590",
  "Randy Neugebauer": "N000182",
  "Elizabeth Dole": "D000601",
  "Norm Coleman": "C001057",
  "Lamar Alexander": "A000360",
  "Dean Barkley": "B001237",
  "John Sullivan": "S001155",
  "Jeff Miller": "M001144",
  "J Forbes": "F000445",
  "Diane Watson": "W000794",
  "Bill Shuster": "S001154",
  "Anibal Acevedo-Vila": "A000359",
  "Eric Cantor": "C001046",
  "Edward Schrock": "S001151",
  "Jo Davis": "D000597",
  "Jim Matheson": "M001142",
  "John Culberson": "C001048",
  "Henry Brown": "B001235",
  "Todd Platts": "P000585",
  "Melissa Hart": "H001033",
  "Brad Carson": "C001044",
  "Patrick Tiberi": "T000462",
  "Steve Israel": "I000057",
  "Felix Grucci": "G000547",
  "Mike Ferguson": "F000443",
  "Tom Osborne": "O000165",
  "W Akin": "A000358",
  "Wm Clay": "C001049",
  "Mark Kennedy": "K000358",
  "Brian Kerns": "K000359",
  "Mike Pence": "P000587",
  "Timothy Johnson": "J000285",
  "C Otter": "O000166",
  "Adam Putnam": "P000586",
  "Ric Keller": "K000361",
  "Ander Crenshaw": "C001045",
  "Rob Simmons": "S001152",
  "Susan Davis": "D000598",
  "Michael Honda": "H001034",
  "Jeff Flake": "F000444",
  "Mike Ross": "R000573",
  "Jon Corzine": "C001042",
  "Ben Nelson": "N000180",
  "Mark Dayton": "D000596",
  "Bruce Vento": "V000087",
  "Zell Miller": "M001141",
  "Herbert Bateman": "B000229",
  "Joe Baca": "B001234",
  "Lincoln Chafee": "C001040",
  "Michael Flanagan": "F000187",
  "Floyd Flake": "F000184",
  "Floyd Fithian": "F000161",
  "O Fisher": "F000152",
  "Joesph Fisher": "F000151",
  "Hamilton Fish": "F000141",
  "Robert Cramer": "C000868",
  "Larry Craig": "C000858",
  "William Coyne": "C000846",
  "James Coyne": "C000845",
  "John Cox": "C000836",
  "Christopher Cox": "C000830",
  "Jim Courter": "C000809",
  "Lawrence Coughlin": "C000807",
  "William Cotter": "C000799",
  "Jerry Costello": "C000794",
  "Baltasar Corrada": "C000788",
  "David Cornwell": "C000787",
  "Robert Cornell": "C000782",
  "James Corman": "C000780",
  "Tom Corcoran": "C000773",
  "Sam Coppersmith": "C000767",
  "Wes Cooley": "C000737",
  "John Conyers": "C000714",
  "Silvio Conte": "C000709",
  "John Conlan": "C000682",
  "Gary Condit": "C000670",
  "Barber Conable": "C000666",
  "Larry Combest": "C000653",
  "Antonio Colorado": "C000646",
  "Mac Collins": "C000640",
  "James Collins": "C000638",
  "Cardiss Collins": "C000634",
  "Barbara-Rose Collins": "C000633",
  "Harold Collier": "C000629",
  "Ronald Coleman": "C000621",
  "E Coleman": "C000618",
  "William Cohen": "C000598",
  "Anthony Coelho": "C000581",
  "Tom Coburn": "C000560",
  "Howard Coble": "C000556",
  "William Cobey": "C000555",
  "Daniel Coats": "C000542",
  "William Clinger": "C000523",
  "James Cleveland": "C000512",
  "Bob Clement": "C000503",
  "Eva Clayton": "C000494",
  "William Clay": "C000488",
  "Del Clawson": "C000476",
  "Don Clausen": "C000475",
  "James Clarke": "C000462",
  "Frank Clark": "C000431",
  "Donald Clancy": "C000409",
  "Dick Chrysler": "C000385",
  "Jon Christensen": "C000377",
  "Shirley Chisholm": "C000371",
  "Helen Chenoweth-Hage": "C000345",
  "Dick Cheney": "C000344",
  "Eugene Chappie": "C000322",
  "Bill Chappell": "C000321",
  "Jim Chapman": "C000312",
  "Rod Chandler": "C000293",
  "Saxby Chambliss": "C000286",
  "Charles Chamberlain": "C000275",
  "Elford Cederberg": "C000263",
  "John Cavanaugh": "C000261",
  "Michael Castle": "C000243",
  "Bob Casey": "C000228",
  "Tim Carter": "C000201",
  "William Carney": "C000165",
  "Charles Carney": "C000164",
  "Gregory Carman": "C000158",
  "Hugh Carey": "C000143",
  "Bruce Caputo": "C000137",
  "Charles Canady": "C000107",
  "Tom Campbell": "C000100",
  "Carroll Campbell": "C000079",
  "Ben Campbell": "C000077",
  "John Camp": "C000073",
  "Dave Camp": "C000071",
  "Sonny Callahan": "C000052",
  "Goodloe Byron": "B001221",
  "Beverly Byron": "B001220",
  "Leslie Byrne": "B001213",
  "Steve Buyer": "B001203",
  "M Butler": "B001182",
  "Albert Bustamante": "B001172",
  "Sala Burton": "B001158",
  "Phillip Burton": "B001156",
  "John Burton": "B001153",
  "Dan Burton": "B001149",
  "Bill Burlison": "B001113",
  "Omar Burleson": "B001111",
  "Yvonne Burke": "B001102",
  "James Burke": "B001092",
  "J Burke": "B001091",
  "Clair Burgener": "B001080",
  "Jim Bunning": "B001066",
  "Jim Bunn": "B001063",
  "Jack Buechner": "B001036",
  "John Buchanan": "B001008",
  "John Bryant": "B000997",
  "Ed Bryant": "B000996",
  "Terry Bruce": "B000971",
  "Joel Broyhill": "B000967",
  "Sam Brownback": "B000953",
  "Hank Brown": "B000919",
  "George Brown": "B000918",
  "Garry Brown": "B000917",
  "Corrine Brown": "B000911",
  "Clarence Brown": "B000910",
  "Glen Browder": "B000897",
  "Donald Brotzman": "B000893",
  "William Broomfield": "B000890",
  "Jack Brooks": "B000880",
  "William Brodhead": "B000862",
  "Robin Britt": "B000845",
  "Ken Bentsen": "B000400",
  "Helen Bentley": "B000392",
  "Charles Bennett": "B000371",
  "Adam Benjamin": "B000363",
  "Jamie Benitez": "B000362",
  "Cleve Benedict": "B000358",
  "Alphonzo Bell": "B000330",
  "Anthony Beilenson": "B000318",
  "Berkley Bedell": "B000298",
  "Xavier Becerra": "B000287",
  "Robin Beard": "B000280",
  "Edward Beard": "B000279",
  "Robert Bauman": "B000244",
  "Max Baucus": "B000243",
  "Jim Bates": "B000236",
  "Charles Bass": "B000220",
  "Joe Barton": "B000213",
  "Steve Bartlett": "B000204",
  "Roscoe Bartlett": "B000208",
  "William Barrett": "B000178",
  "Thomas Barrett": "B000177",
  "Bill Barrett": "B000179",
  "Bob Barr": "B000169",
  "Michael Barnes": "B000160",
  "Doug Barnard": "B000153",
  "Tom Barlow": "B000151",
  "James Barcia": "B000134",
  "Peter Barca": "B001226",
  "Cass Ballenger": "B000104",
  "Alvin Baldus": "B000083",
  "John Baldacci": "B000081",
  "Richard Baker": "B000072",
  "LaMar Baker": "B000069",
  "Bill Baker": "B000078",
  "Wendell Bailey": "B000047",
  "Donald Bailey": "B000037",
  "Scotty Baesler": "B000028",
  "Herman Badillo": "B000025",
  "Robert Badham": "B000024",
  "Spencer Bachus": "B000013",
  "Jim Bacchus": "B000008",
  "Les AuCoin": "A000337",
  "Eugene Atkinson": "A000329",
  "Chester Atkins": "A000226",
  "Les Aspin": "A000224",
  "Thomas Ashley": "A000222",
  "John Ashbrook": "A000221",
  "Jean Ashbrook": "A000220",
  "William Armstrong": "A000219",
  "Richard Armey": "A000217",
  "Leslie Arends": "A000216",
  "Bill Archer": "A000215",
  "Douglas Applegate": "A000214",
  "Beryl Anthony": "A000213",
  "Frank Annunzio": "A000212",
  "Thomas Andrews": "A000211",
  "Robert Andrews": "A000210",
  "Michael Andrews": "A000209",
  "Mark Andrews": "A000208",
  "Ike Andrews": "A000207",
  "John Anderson": "A000195",
  "Glenn Anderson": "A000189",
  "Joseph Ammerman": "A000177",
  "Jerome Ambro": "A000170",
  "George Allen": "A000121",
  "Clifford Allen": "A000118",
  "Wayne Allard": "A000109",
  "Bill Alexander": "A000103",
  "Donald Albosta": "A000076",
  "Carl Albert": "A000073",
  "Daniel Akaka": "A000069",
  "Joseph Addabbo": "A000052",
  "Brock Adams": "A000031",
  "Gary Ackerman": "A000022",
  "Bella Abzug": "A000018",
  "Neil Abercrombie": "A000014",
  "James Abdnor": "A000009",
  "Eric Fingerhut": "F000128",
  "Paul Findley": "F000123",
  "Bob Filner": "F000116",
  "Jack Fields": "F000111",
  "Cleo Fields": "F000110",
  "Bobbi Fiedler": "F000102",
  "Geraldine Ferraro": "F000088",
  "Millicent Fenwick": "F000078",
  "Edward Feighan": "F000059",
  "Vic Fazio": "F000053",
  "Harris Fawell": "F000049",
  "Walter Fauntroy": "F000046",
  "Chaka Fattah": "F000043",
  "Dante Fascell": "F000041",
  "John Fary": "F000040",
  "Sam Farr": "F000030",
  "Eni Faleomavaega": "F000010",
  "Thomas Ewing": "E000282",
  "Joe Evins": "E000273",
  "Thomas Evans": "E000258",
  "Melvin Evans": "E000254",
  "Lane Evans": "E000250",
  "Frank Evans": "E000240",
  "David Evans": "E000239",
  "Cooper Evans": "E000259",
  "Billy Evans": "E000233",
  "Mike Espy": "E000218",
  "Edwin Eshleman": "E000214",
  "Marvin Esch": "E000213",
  "Allen Ertel": "E000208",
  "John Erlenborn": "E000204",
  "Ben Erdreich": "E000201",
  "John Ensign": "E000194",
  "Phil English": "E000187",
  "Karan English": "E000186",
  "Glenn English": "E000184",
  "Eliot Engel": "E000179",
  "David Emery": "E000175",
  "Bill Emerson": "E000174",
  "Joshua Eilberg": "E000096",
  "Robert Ehrlich": "E000093",
  "Vernon Ehlers": "E000092",
  "Mickey Edwards": "E000077",
  "Jack Edwards": "E000084",
  "Don Edwards": "E000064",
  "Chet Edwards": "E000063",
  "Robert Edgar": "E000043",
  "Bob Eckhardt": "E000035",
  "Fred Eckert": "E000033",
  "Dennis Eckart": "E000031",
  "Joseph Early": "E000013",
  "Roy Dyson": "D000593",
  "Mervyn Dymally": "D000592",
  "Bernard Dwyer": "D000586",
  "Jim Dunn": "D000548",
  "Jennifer Dunn": "D000549",
  "Robert Duncan": "D000537",
  "John Duncan": "D000534",
  "Thaddeus Dulski": "D000523",
  "Pont du": "D000558",
  "Robert Drinan": "D000499",
  "David Dreier": "D000492",
  "Thomas Downing": "D000474",
  "Thomas Downey": "D000471",
  "Wayne Dowdy": "D000466",
  "Chuck Douglas": "D000451",
  "Charles Dougherty": "D000446",
  "Robert Dornan": "D000435",
  "William Dorn": "D000434",
  "Byron Dorgan": "D000432",
  "John Doolittle": "D000429",
  "Calvin Dooley": "D000424",
  "Harold Donohue": "D000419",
  "Christopher Dodd": "D000388",
  "Julian Dixon": "D000373",
  "Joseph DioGuardi": "D000359",
  "John Dingell": "D000355",
  "Charles Diggs": "D000344",
  "Norman Dicks": "D000327",
  "William Dickinson": "D000326",
  "Jay Dickey": "D000312",
  "Lincoln Diaz-Balart": "D000299",
  "Samuel Devine": "D000279",
  "Peter Deutsch": "D000275",
  "Edward Derwinski": "D000269",
  "Butler Derrick": "D000267",
  "John Dent": "D000255",
  "David Dennis": "D000241",
  "Frank Denholm": "D000234",
  "Lawrence DeNardis": "D000231",
  "Ronald Dellums": "D000222",
  "John Dellenback": "D000220",
  "James Delaney": "D000211",
  "Joel Deckard": "D000183",
  "Nathan Deal": "D000168",
  "la de": "D000203",
  "Lugo de": "D000209",
  "Tom Davis": "D000136",
  "Robert Davis": "D000131",
  "Mendel Davis": "D000125",
  "John Davis": "D000122",
  "Jack Davis": "D000106",
  "Glenn Davis": "D000102",
  "Hal Daub": "D000065",
  "George Darden": "D000051",
  "Pat Danner": "D000046",
  "William Dannemeyer": "D000044",
  "George Danielson": "D000043",
  "Dominick Daniels": "D000041",
  "W Daniel": "D000038",
  "Robert Daniel": "D000037",
  "Norman D'Amours": "D000017",
  "Randy Cunningham": "C000994",
  "John Cunningham": "C000992",
  "Elijah Cummings": "C000984",
  "John Culver": "C000979",
  "Barbara Cubin": "C000962",
  "Paul Cronin": "C000925",
  "George Crockett": "C000919",
  "Frank Cremeans": "C000903",
  "Philip Crane": "C000873",
  "Daniel Crane": "C000871",
  "Gillis Long": "L000417",
  "Clarence Long": "L000413",
  "Cathy Long": "L000411",
  "Tom Loeffler": "L000396",
  "Frank LoBiondo": "L000554",
  "Marilyn Lloyd": "L000381",
  "James Lloyd": "L000379",
  "Bob Livingston": "L000371",
  "Jerry Litton": "L000360",
  "William Lipinski": "L000342",
  "John Linder": "L000321",
  "Jim Lightfoot": "L000305",
  "Thomas Lewis": "L000295",
  "Ron Lewis": "L000293",
  "John Lewis": "L000287",
  "Jerry Lewis": "L000274",
  "David Levy": "L000267",
  "Mel Levine": "L000264",
  "Sander Levin": "L000263",
  "Norman Lent": "L000243",
  "Mickey Leland": "L000237",
  "William Lehman": "L000226",
  "Richard Lehman": "L000225",
  "Robert Leggett": "L000221",
  "Joseph LeFante": "L000561",
  "Gary Lee": "L000192",
  "Raymond Lederer": "L000187",
  "John LeBoutillier": "L000547",
  "Marvin Leath": "L000180",
  "James Leach": "L000169",
  "Claude Leach": "L000167",
  "Rick Lazio": "L000155",
  "Greg Laughlin": "L000119",
  "Delbert Latta": "L000116",
  "Steven LaTourette": "L000553",
  "Tom Latham": "L000111",
  "Larry LaRocco": "L000098",
  "Steve Largent": "L000096",
  "Tom Lantos": "L000090",
  "Phil Landrum": "L000054",
  "Earl Landgrebe": "L000049",
  "H Lancaster": "L000045",
  "Ray LaHood": "L000552",
  "Robert Lagomarsino": "L000020",
  "John LaFalce": "L000556",
  "Peter Kyros": "K000356",
  "Jon Kyl": "K000352",
  "Dan Kuykendall": "K000348",
  "Mike Kreidler": "K000328",
  "John Krebs": "K000325",
  "Ken Kramer": "K000322",
  "Peter Kostmayer": "K000319",
  "Mike Kopetski": "K000312",
  "Ernest Konnyu": "K000309",
  "Joseph Kolter": "K000307",
  "Ray Kogovsek": "K000304",
  "Edward Koch": "K000302",
  "Joe Knollenberg": "K000288",
  "Scott Klug": "K000274",
  "John Kluczynski": "K000273",
  "Ron Klink": "K000270",
  "Gerald Kleczka": "K000259",
  "Jack Kingston": "K000220",
  "Peter King": "K000210",
  "Carleton King": "K000195",
  "Thomas Kindness": "K000190",
  "Jay Kim": "K000181",
  "Dale Kildee": "K000172",
  "Martha Keys": "K000162",
  "William Ketchum": "K000153",
  "Barbara Kennelly": "K000118",
  "Patrick Kennedy": "K000113",
  "Jack Kemp": "K000086",
  "Sue Kelly": "K000078",
  "Richard Kelly": "K000077",
  "Abraham Kazen": "K000025",
  "Robert Kastenmeier": "K000020",
  "Robert Kasten": "K000019",
  "John Kasich": "K000016",
  "Joseph Karth": "K000014",
  "Paul Kanjorski": "K000008",
  "Barbara Jordan": "J000266",
  "Jim Jontz": "J000265",
  "Walter Jones": "J000256",
  "Robert Jones": "J000248",
  "James Jones": "J000232",
  "Ed Jones": "J000216",
  "Ben Jones": "J000211",
  "Harry Johnston": "J000187",
  "Eugene Johnston": "J000200",
  "Sam Johnson": "J000174",
  "Nancy Johnson": "J000163",
  "Harold Johnson": "J000135",
  "Don Johnson": "J000120",
  "Albert Johnson": "J000115",
  "Edgar Jenkins": "J000083",
  "Jim Jeffries": "J000074",
  "James Jeffords": "J000072",
  "William Jefferson": "J000070",
  "John Jarman": "J000057",
  "Craig James": "J000047",
  "Andrew Jacobs": "J000033",
  "Jesse Jackson": "J000283",
  "Ernest Istook": "I000047",
  "Andrew Ireland": "I000029",
  "Jay Inslee": "I000026",
  "Bob Inglis": "I000023",
  "Richard Ichord": "I000001",
  "Henry Hyde": "H001022",
  "Earl Hutto": "H001018",
  "Tim Hutchinson": "H001015",
  "Edward Hutchinson": "H001011",
  "John Hunt": "H000972",
  "William Hungate": "H000965",
  "William Hughes": "H000930",
  "Michael Huffington": "H000912",
  "William Hudnut": "H000906",
  "Thomas Huckaby": "H000901",
  "Robert Huber": "H000897",
  "Allan Howe": "H000851",
  "James Howard": "H000840",
  "Amo Houghton": "H000814",
  "John Hostettler": "H000807",
  "Craig Hosmer": "H000802",
  "Frank Horton": "H000797",
  "Stephen Horn": "H000789",
  "Joan Horn": "H000788",
  "Larry Hopkins": "H000776",
  "Elizabeth Holtzman": "H000752",
  "Marjorie Holt": "H000747",
  "Clyde Holloway": "H000729",
  "Harold Hollenbeck": "H000722",
  "Kenneth Holland": "H000719",
  "Chet Holifield": "H000713",
  "Tim Holden": "H000712",
  "Martin Hoke": "H000707",
  "Lawrence Hogan": "H000692",
  "Peter Hoekstra": "H000676",
  "George Hochbrueckner": "H000670",
  "David Hobson": "H000666",
  "Peter Hoagland": "H000652",
  "Jon Hinson": "H000641",
  "Andrew Hinshaw": "H000638",
  "Maurice Hinchey": "H000627",
  "Earl Hilliard": "H000621",
  "Van Hilleary": "H000615",
  "John Hiler": "H000586",
  "Jack Hightower": "H000582",
  "Floyd Hicks": "H000563",
  "Dennis Hertel": "H000547",
  "Wally Herger": "H000528",
  "Paul Henry": "H000514",
  "Bill Hendon": "H000490",
  "David Henderson": "H000479",
  "Henry Helstoski": "H000465",
  "John Heinz": "H000456",
  "Frederick Heineman": "H000452",
  "Cecil Heftel": "H000449",
  "W Hefner": "H000448",
  "Joel Hefley": "H000444",
  "Margaret Heckler": "H000440",
  "Ken Hechler": "H000438",
  "F Hebert": "H000437",
  "J Hayworth": "H000413",
  "Wayne Hays": "H000408",
  "James Hayes": "H000390",
  "Charles Hayes": "H000388",
  "Augustus Hawkins": "H000367",
  "Charles Hatcher": "H000340",
  "James Hastings": "H000327",
  "Doc Hastings": "H000329",
  "J Hastert": "H000323",
  "James Harvey": "H000306",
  "Thomas Hartnett": "H000302",
  "William Harsha": "H000281",
  "Frank Harrison": "H000269",
  "Herbert Harris": "H000241",
  "Claude Harris": "H000236",
  "Michael Harrington": "H000230",
  "Tom Harkin": "H000206",
  "Orval Hansen": "H000175",
  "Julia Hansen": "H000174",
  "James Hansen": "H000172",
  "George Hansen": "H000171",
  "Robert Hanrahan": "H000168",
  "Mark Hannaford": "H000166",
  "James Hanley": "H000158",
  "Mel Hancock": "H000151",
  "Kent Hance": "H000144",
  "John Hammerschmidt": "H000124",
  "Lee Hamilton": "H000114",
  "Dan Hamburg": "H000096",
  "Tony Hall": "H000074",
  "Tim Hall": "H000073",
  "Sam Hall": "H000070",
  "Ralph Hall": "H000067",
  "Katie Hall": "H000058",
  "James Haley": "H000041",
  "Thomas Hagedorn": "H000012",
  "Tennyson Guyer": "G000537",
  "Gil Gutknecht": "G000536",
  "Luis Gutierrez": "G000535",
  "Steve Gunderson": "G000524",
  "V Gudger": "G000515",
  "Gilbert Gude": "G000513",
  "Charles Gubser": "G000512",
  "Frank Guarini": "G000511",
  "James Grover": "G000504",
  "John Grotberg": "G000499",
  "H Gross": "G000495",
  "Wayne Grisham": "G000480",
  "Martha Griffiths": "G000471",
  "Judd Gregg": "G000445",
  "James Greenwood": "G000439",
  "William Green": "G000420",
  "S Green": "G000417",
  "Gene Green": "G000410",
  "Edith Green": "G000407",
  "William Gray": "G000402",
  "Kenneth Gray": "G000400",
  "Ella Grasso": "G000387",
  "Bill Grant": "G000382",
  "Fred Grandy": "G000371",
  "Rod Grams": "G000367",
  "Phil Gramm": "G000365",
  "Willis Gradison": "G000349",
  "Porter Goss": "G000336",
  "Albert Gore": "G000321",
  "Bart Gordon": "G000309",
  "William Goodling": "G000291",
  "Bob Goodlatte": "G000289",
  "Henry Gonzalez": "G000272",
  "Dan Glickman": "G000240",
  "Bo Ginn": "G000226",
  "Newt Gingrich": "G000225",
  "Benjamin Gilman": "G000212",
  "Paul Gillmor": "G000210",
  "Wayne Gilchrest": "G000180",
  "Sam Gibbons": "G000153",
  "Robert Giaimo": "G000151",
  "Tom Gettys": "G000144",
  "Pete Geren": "G000134",
  "Richard Gephardt": "G000132",
  "George Gekas": "G000121",
  "Sam Gejdenson": "G000120",
  "Joseph Gaydos": "G000105",
  "Greg Ganske": "G000041",
  "Robert Gammage": "G000036",
  "Dean Gallo": "G000025",
  "Elton Gallegly": "G000021",
  "Jamie Fuster": "F000435",
  "Elizabeth Furse": "F000434",
  "Don Fuqua": "F000430",
  "David Funderburk": "F000426",
  "Richard Fulton": "F000424",
  "Martin Frost": "F000392",
  "Harold Froehlich": "F000388",
  "Dan Frisa": "F000387",
  "Lou Frey": "F000381",
  "Bill Frenzel": "F000380",
  "Rodney Frelinghuysen": "F000372",
  "Peter Frelinghuysen": "F000371",
  "Victor Frazer": "F000351",
  "Donald Fraser": "F000350",
  "Gary Franks": "F000348",
  "Bob Franks": "F000349",
  "William Franklin": "F000347",
  "Barney Frank": "F000339",
  "Jon Fox": "F000332",
  "Wyche Fowler": "F000329",
  "Tillie Fowler": "F000328",
  "L Fountain": "F000319",
  "Edwin Forsythe": "F000286",
  "William Ford": "F000270",
  "Gerald Ford": "F000260",
  "Michael Forbes": "F000257",
  "Thomas Foley": "F000239",
  "Mark Foley": "F000238",
  "Thomas Foglietta": "F000235",
  "John Flynt": "F000229",
};

// Latest bills call and attachement of event listeners
$.ajax({
  type: "GET",
  url: "https://api.congress.gov/v3/bill?api_key=" + apiKeys.congress,
  beforeSend: function () {
    $("#column-1").html(
      "<div class='spinner-border m-3' id='bills-spinner' role='status'>\
  <span class='visually-hidden'>Loading...</span>\
</div>"
    );
  },
  success: function (data) {
    for (let i = 0; i < data["bills"].length; i++) {
      var billSummary;
      let billInfoURL =
        "https://api.congress.gov/v3/bill/" +
        data["bills"][i]["congress"] +
        "/" +
        data["bills"][i]["type"].toLowerCase() +
        "/" +
        data["bills"][i]["number"] +
        "/summaries?api_key=" +
        apiKeys.congress;
      let sponsorURL =
        "https://api.congress.gov/v3/bill/" +
        data["bills"][i]["congress"] +
        "/" +
        data["bills"][i]["type"].toLowerCase() +
        "/" +
        data["bills"][i]["number"] +
        "?api_key=" +
        apiKeys.congress;
      $.get(sponsorURL, (res) => {
        billData = res;
        let sponsorId = res["bill"]["sponsors"][0].bioguideId;
        let sponsorImgURL =
          "https://api.congress.gov/v3/member/" +
          sponsorId +
          "?api_key=" +
          apiKeys.congress;
        $.get(sponsorImgURL, (r) => {
          var sponsorImg = r["member"]["depiction"].imageUrl;
          $.get(billInfoURL, (resp) => {
            if (resp["summaries"][0]) {
              billSummary = resp["summaries"][0]["text"];
            } else if (resp["summaries"]) {
              billSummary = resp["summaries"]["text"];
            }

            if (billSummary === undefined) {
              billSummary = "Summary Loading.... ";
            }
            if (data["bills"][i]["latestAction"]["actionDate"]) {
              var actionDate =
                data["bills"][i]["latestAction"]["actionDate"];
            }
            let month = actionDate[5] + actionDate[6];
            if (month[0] == 0) {
              month = month[1];
            }
            let day = actionDate[8] + actionDate[9];
            if (day[0] == 0) {
              day = day[1];
            }
            let year =
              actionDate[0] + actionDate[1] + actionDate[2] + actionDate[3];
            actionDate = month + "/" + day + "/" + year;
            let cardHtml =
              '<div class="card m-3" style="width: auto"> \
              <div class="card-body"><div class=""><div class="d-flex align-items-center">\
                  <a href="/member-desc.html?id=' +
              r["member"].bioguideId +
              '"><img src="' +
              sponsorImg +
              '" class="sponsor-img" style="object-fit:cover;width: 50px;height: 50px;border-radius: 50%; margin-right: 10px;"></a>\
                  <div>' +
              '<div class="bill-title" style="font-weight: bold;"><h5 class="card-title" style="display:inline;">' +
              data["bills"][i]["title"] +
              '</h5>\
                    </div>\
                          <div class="latest-action"><small class="d-inline-flex mb-3 px-2 py-1 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">LATEST ACTION (' +
              actionDate +
              "): " +
              data["bills"][i]["latestAction"]["text"] +
              '</small></div></div></div>\
                <p class="card-text mt-2">' +
              billSummary +
              '</p> \
                <span class="badge rounded-pill text-bg-secondary">' +
              data["bills"][i]["originChamberCode"] +
              data["bills"][i]["number"] +
              '</span> \
                <a id="' +
              data["bills"][i]["congress"] +
              "-" +
              data["bills"][i]["type"].toLowerCase() +
              "-" +
              data["bills"][i]["number"] +
              '" class="btn btn-primary btn-sm ms-3">More info</a>\
              </div> \
            </div>';

            $("#column-1").append(cardHtml);
            $(
              "#" +
                data["bills"][i]["congress"] +
                "-" +
                data["bills"][i]["type"].toLowerCase() +
                "-" +
                data["bills"][i]["number"]
            ).on("click", function (e) {
              let params = e.target.id.split("-");
              let congressNum = params[0];
              let billType = params[1];
              let billNum = params[2];
              let apiUrl =
                "https://api.congress.gov/v3/bill/" +
                congressNum +
                "/" +
                billType +
                "/" +
                billNum +
                "?api_key=" +
                apiKeys.congress;
              $.get(apiUrl, function (resp) {
                openBillModal(resp);
              });
            });
          });
        });
      });
    }
    let dataset = [];
    for (let i = 0; i < data["bills"].length; i++) {
      let currentBill = data["bills"][i];
      let currentDataset = {};
      currentDataset["billName"] = currentBill["title"];
      currentDataset["billNumber"] = currentBill["number"];
      currentDataset["congressSession"] = currentBill["congress"];
      currentDataset["summary"] = "<SUMMARIZE THIS BILL>";
      dataset.push(currentDataset);
    }
    let dataset1 = dataset.slice(0, Math.round(dataset.length / 4));
    let dataset2 = dataset.slice(
      Math.round(dataset.length / 4),
      Math.round(dataset.length / 2)
    );
    let dataset3 = dataset.slice(
      Math.round(dataset.length / 2),
      Math.round((dataset.length / 4) * 3)
    );
    let dataset4 = dataset.slice(
      Math.round((dataset.length / 4) * 3),
      dataset.length
    );
    let prompt =
      "\
    Provide a detailed 5-8 sentence paragraph summary for each of the following congressional bills. Return the summaries in a json array\n\n";
    Promise.all([
      model.generateContent(prompt + JSON.stringify(dataset1)),
      model.generateContent(prompt + JSON.stringify(dataset2)),
      model.generateContent(prompt + JSON.stringify(dataset3)),
      model.generateContent(prompt + JSON.stringify(dataset4)),
    ])
      .then(([result1, result2, result3, result4]) => {
        $("#bills-spinner").remove();
        $("#column-1").html("")
        let stringedResponses = [
          result1.response.text(),
          result2.response.text(),
          result3.response.text(),
          result4.response.text(),
        ]; // Convert both responses to text
        let cleanedResponseString1 = stringedResponses[0].replace(
          /```json|```/g,
          ""
        );
        let cleanedResponseString2 = stringedResponses[1].replace(
          /```json|```/g,
          ""
        );
        let cleanedResponseString3 = stringedResponses[2].replace(
          /```json|```/g,
          ""
        );
        let cleanedResponseString4 = stringedResponses[3].replace(
          /```json|```/g,
          ""
        );
        let response1;
        let response2;
        let response3;
        let response4;
        try {
          response1 = JSON.parse(cleanedResponseString1);
        } catch {
          response1 = [];
        }
        try {
          response2 = JSON.parse(cleanedResponseString2);
        } catch {
          response2 = [];
        }
        try {
          response3 = JSON.parse(cleanedResponseString3);
        } catch {
          response3 = [];
        }
        try {
          response4 = JSON.parse(cleanedResponseString4);
        } catch {
          response4 = [];
        }
        let finalResponse = response1
          .concat(response2)
          .concat(response3)
          .concat(response4);
        for (let i = 0; i < data["bills"].length; i++) {
          var billSummary;
          var color1 = "#000000";
          var color2 = "#000000";
          var generatedWithAISign = "";
          let billInfoURL =
            "https://api.congress.gov/v3/bill/" +
            data["bills"][i]["congress"] +
            "/" +
            data["bills"][i]["type"].toLowerCase() +
            "/" +
            data["bills"][i]["number"] +
            "/summaries?api_key=" +
            apiKeys.congress;
          let sponsorURL =
            "https://api.congress.gov/v3/bill/" +
            data["bills"][i]["congress"] +
            "/" +
            data["bills"][i]["type"].toLowerCase() +
            "/" +
            data["bills"][i]["number"] +
            "?api_key=" +
            apiKeys.congress;
          $.get(sponsorURL, (res) => {
            billData = res;
            let sponsorId = res["bill"]["sponsors"][0].bioguideId;
            let sponsorImgURL =
              "https://api.congress.gov/v3/member/" +
              sponsorId +
              "?api_key=" +
              apiKeys.congress;
            $.get(sponsorImgURL, (r) => {
              var sponsorImg = r["member"]["depiction"].imageUrl;
              $.get(billInfoURL, (resp) => {
                if (data["bills"][i]["latestAction"]["actionDate"]) {
                  var actionDate =
                    data["bills"][i]["latestAction"]["actionDate"];
                }
                let month = actionDate[5] + actionDate[6];
                if (month[0] == 0) {
                  month = month[1];
                }
                let day = actionDate[8] + actionDate[9];
                if (day[0] == 0) {
                  day = day[1];
                }
                let year =
                  actionDate[0] + actionDate[1] + actionDate[2] + actionDate[3];
                actionDate = month + "/" + day + "/" + year;
                if (resp["summaries"][0]) {
                  billSummary = resp["summaries"][0]["text"];
                } else if (resp["summaries"]) {
                  billSummary = resp["summaries"]["text"];
                }

                if (billSummary === undefined) {
                  color1 = "#6090FF";
                  color2 = "#FF76A1";
                  for (let bill in finalResponse) {
                    let currentBill = finalResponse[bill];
                    if (
                      currentBill["billNumber"] == data["bills"][i]["number"]
                    ) {
                      billSummary = currentBill["summary"];
                      break;
                    }
                  }
                  if (billSummary == undefined) {
                    generatedWithAISign = "";
                    billSummary = "No Summary Found";
                    color1 = "#000000";
                    color2 = "#000000";
                  } else {
                    generatedWithAISign =
                      '<span class="badge rounded-pill" style="background:linear-gradient(to right, ' +
                      color1 +
                      ", " +
                      color2 +
                      ')"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16">\
  <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>\
</svg>Generated with AI</span>';
                  }
                }

                let cardHtml =
                  '<div class="card m-3" style="width: auto"> \
                <div class="card-body"><div class=""><div class="d-flex align-items-center">\
                    <a href="/member-desc.html?id=' +
                  r["member"].bioguideId +
                  '"><img src="' +
                  sponsorImg +
                  '" class="sponsor-img" style="object-fit:cover;width: 50px;height: 50px;border-radius: 50%; margin-right: 10px;"></a>\
                    <div>' +
                  '<div class="bill-title" style="font-weight: bold;"><h5 class="card-title" style="display:inline;">' +
                  data["bills"][i]["title"] +
                  '</h5>\
                      </div>\
                            <div class="latest-action"><small class="d-inline-flex mb-3 px-2 py-1 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">LATEST ACTION (' +
                  actionDate +
                  "): " +
                  data["bills"][i]["latestAction"]["text"] +
                  "</small></div></div></div>" +
                  generatedWithAISign +
                  '\
                  <p class="card-text mt-2" style="background: linear-gradient(to right, ' +
                  color1 +
                  ", " +
                  color2 +
                  '); -webkit-background-clip: text; -webkit-text-fill-color: transparent">' +
                  billSummary +
                  '</p> \
                  <span class="badge rounded-pill text-bg-secondary">' +
                  data["bills"][i]["originChamberCode"] +
                  data["bills"][i]["number"] +
                  '</span> \
                  <a id="' +
                  data["bills"][i]["congress"] +
                  "-" +
                  data["bills"][i]["type"].toLowerCase() +
                  "-" +
                  data["bills"][i]["number"] +
                  '" class="btn btn-primary btn-sm ms-3">More info</a>\
                </div> \
              </div>';

                $("#column-1").append(cardHtml);
                $(
                  "#" +
                    data["bills"][i]["congress"] +
                    "-" +
                    data["bills"][i]["type"].toLowerCase() +
                    "-" +
                    data["bills"][i]["number"]
                ).on("click", function (e) {
                  let params = e.target.id.split("-");
                  let congressNum = params[0];
                  let billType = params[1];
                  let billNum = params[2];
                  let apiUrl =
                    "https://api.congress.gov/v3/bill/" +
                    congressNum +
                    "/" +
                    billType +
                    "/" +
                    billNum +
                    "?api_key=" +
                    apiKeys.congress;
                  $.get(apiUrl, function (resp) {
                    openBillModal(resp);
                  });
                });
                $("#bills-spinner").remove();
              });
            });
          });
        }
      })
      .catch((error) => {
        $("#bills-spinner").remove();
        $("#column-1").html("")
        for (let i = 0; i < data["bills"].length; i++) {
          var billSummary;
          let billInfoURL =
            "https://api.congress.gov/v3/bill/" +
            data["bills"][i]["congress"] +
            "/" +
            data["bills"][i]["type"].toLowerCase() +
            "/" +
            data["bills"][i]["number"] +
            "/summaries?api_key=" +
            apiKeys.congress;
          let sponsorURL =
            "https://api.congress.gov/v3/bill/" +
            data["bills"][i]["congress"] +
            "/" +
            data["bills"][i]["type"].toLowerCase() +
            "/" +
            data["bills"][i]["number"] +
            "?api_key=" +
            apiKeys.congress;
          $.get(sponsorURL, (res) => {
            billData = res;
            let sponsorId = res["bill"]["sponsors"][0].bioguideId;
            let sponsorImgURL =
              "https://api.congress.gov/v3/member/" +
              sponsorId +
              "?api_key=" +
              apiKeys.congress;
            $.get(sponsorImgURL, (r) => {
              var sponsorImg = r["member"]["depiction"].imageUrl;
              $.get(billInfoURL, (resp) => {
                if (resp["summaries"][0]) {
                  billSummary = resp["summaries"][0]["text"];
                } else if (resp["summaries"]) {
                  billSummary = resp["summaries"]["text"];
                }

                if (billSummary === undefined) {
                  billSummary = "No summary available. ";
                }
                if (data["bills"][i]["latestAction"]["actionDate"]) {
                  var actionDate =
                    data["bills"][i]["latestAction"]["actionDate"];
                }
                let month = actionDate[5] + actionDate[6];
                if (month[0] == 0) {
                  month = month[1];
                }
                let day = actionDate[8] + actionDate[9];
                if (day[0] == 0) {
                  day = day[1];
                }
                let year =
                  actionDate[0] + actionDate[1] + actionDate[2] + actionDate[3];
                actionDate = month + "/" + day + "/" + year;
                let cardHtml =
                  '<div class="card m-3" style="width: auto"> \
                  <div class="card-body"><div class=""><div class="d-flex align-items-center">\
                      <a href="/member-desc.html?id=' +
                  r["member"].bioguideId +
                  '"><img src="' +
                  sponsorImg +
                  '" class="sponsor-img" style="object-fit:cover;width: 50px;height: 50px;border-radius: 50%; margin-right: 10px;"></a>\
                      <div>' +
                  '<div class="bill-title" style="font-weight: bold;"><h5 class="card-title" style="display:inline;">' +
                  data["bills"][i]["title"] +
                  '</h5>\
                        </div>\
                              <div class="latest-action"><small class="d-inline-flex mb-3 px-2 py-1 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">LATEST ACTION (' +
                  actionDate +
                  "): " +
                  data["bills"][i]["latestAction"]["text"] +
                  '</small></div></div></div>\
                    <p class="card-text mt-2">' +
                  billSummary +
                  '</p> \
                    <span class="badge rounded-pill text-bg-secondary">' +
                  data["bills"][i]["originChamberCode"] +
                  data["bills"][i]["number"] +
                  '</span> \
                    <a id="' +
                  data["bills"][i]["congress"] +
                  "-" +
                  data["bills"][i]["type"].toLowerCase() +
                  "-" +
                  data["bills"][i]["number"] +
                  '" class="btn btn-primary btn-sm ms-3">More info</a>\
                  </div> \
                </div>';

                $("#column-1").append(cardHtml);
                $(
                  "#" +
                    data["bills"][i]["congress"] +
                    "-" +
                    data["bills"][i]["type"].toLowerCase() +
                    "-" +
                    data["bills"][i]["number"]
                ).on("click", function (e) {
                  let params = e.target.id.split("-");
                  let congressNum = params[0];
                  let billType = params[1];
                  let billNum = params[2];
                  let apiUrl =
                    "https://api.congress.gov/v3/bill/" +
                    congressNum +
                    "/" +
                    billType +
                    "/" +
                    billNum +
                    "?api_key=" +
                    apiKeys.congress;
                  $.get(apiUrl, function (resp) {
                    openBillModal(resp);
                  });
                });
              });
            });
          });
        }
      });
  },
  error: function (err) {
    console.error("ERROR: Please try again later. ", err.statusCode());
  },
});

// Open modal on click of more info button
function openBillModal(data) {
  var coSponsorData;
  var modalTest = "";
  var coSponsorHTML = "<ul>";
  var policyArea = "No Policy Area Found";
  if (data["bill"].hasOwnProperty("policyArea")) {
    if (data["bill"]["policyArea"].hasOwnProperty("name")) {
      policyArea = data["bill"]["policyArea"]["name"];
      if (!policyArea) {
        policyArea = "No Policy Area Found";
      }
    }
  }
  var introducedDate = "No Introduced Date Found";
  if (data["bill"].hasOwnProperty("introducedDate")) {
    introducedDate = data["bill"]["introducedDate"];
    if (!introducedDate) {
      introducedDate = "No Introduced Date Found";
    } else {
      let month = introducedDate[5] + introducedDate[6];
      if (month[0] == 0) {
        month = month[1];
      }
      let day = introducedDate[8] + introducedDate[9];
      if (day[0] == 0) {
        day = day[1];
      }
      let year =
        introducedDate[0] +
        introducedDate[1] +
        introducedDate[2] +
        introducedDate[3];
      introducedDate = month + "/" + day + "/" + year;
    }
  }
  if (data["bill"]["cosponsors"]) {
    var coSponsorURL =
      data["bill"]["cosponsors"].url +
      "&api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA";
    $.get(coSponsorURL, (response) => {
      for (let index = 0; index < response["cosponsors"].length; index++) {
        let coSponsorName = response["cosponsors"][index].fullName;
        let createdHTML = "<li>" + coSponsorName + "</li>";
        coSponsorHTML = coSponsorHTML + createdHTML;
      }

      if (data["bill"]["policyArea"]) {
        modalTest =
          '<div class="modal" role="dialog" id="billModal">\
      <div class="modal-dialog" role="document">\
        <div class="modal-content">\
          <div class="modal-header">\
            <h5 class="modal-title">' +
          data["bill"].title +
          '</h5>\
          </div>\
          <div class="modal-body">\
            <dl class="row">\
      <dt class="col-sm-4">Sponsor</dt>\
      <dd class="col-sm-7">' +
          data["bill"]["sponsors"][0].fullName +
          '</dd>\
      <dt class="col-sm-4">Bill #</dt>\
      <dd class="col-sm-7">\
          ' +
          data["bill"].number +
          '\
      </dd>\
      <dt class="col-sm-4">Introduced</dt>\
      <dd class="col-sm-7">' +
          introducedDate +
          '</dd>\
      <dt class="col-sm-4">Policy Area</dt>\
      <dd class="col-sm-7">' +
          data["bill"]["policyArea"].name +
          '</dd>\
          <dt class="col-sm-4">More Info</dt>\
      <dd class="col-sm-7">\
      <a href="https://congress.gov/bill/' +
          data["bill"].congress +
          "/" +
          data["bill"].type.toLowerCase() +
          "/" +
          data["bill"].number +
          ' " target="_blank">View</a>\
      </dd>\
      <dt class="col-sm-4">Co-Sponsors</dt>\
      <dd class="col-sm-7"><a data-bs-toggle="collapse" href="#coSponsorsList" role="button" aria-expanded="false" aria-controls="coSponsorsList">View</a></dd>\
    </dl>\
    <div class="collapse" id="coSponsorsList"><div class="card card-body">' +
          coSponsorHTML +
          '</ul></div></div></div>\
          <div class="modal-footer">\
            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="modal-close">Close</button>\
          </div>\
        </div>\
      </div>\
    </div>';
      } else {
        modalTest =
          '<div class="modal" role="dialog" id="myModal">\
      <div class="modal-dialog" role="document">\
        <div class="modal-content">\
          <div class="modal-header">\
            <h5 class="modal-title">' +
          data["bill"].title +
          '</h5>\
          </div>\
          <div class="modal-body">\
            <dl class="row">\
      <dt class="col-sm-4">Sponsor</dt>\
      <dd class="col-sm-7">' +
          data["bill"]["sponsors"][0].fullName +
          '</dd>\
      <dt class="col-sm-4">Bill #</dt>\
      <dd class="col-sm-7">\
          ' +
          data["bill"].number +
          '\
      </dd>\
      <dt class="col-sm-4">Introduced</dt>\
      <dd class="col-sm-7">' +
          introducedDate +
          '</dd>\
          <dt class="col-sm-4">More Info</dt>\
      <dd class="col-sm-7">\
      <a href="https://congress.gov/bill/' +
          data["bill"].congress +
          "/" +
          data["bill"].type.toLowerCase() +
          "/" +
          data["bill"].number +
          ' " target="_blank">View</a>\
      </dd>\
      <dt class="col-sm-4">Co-Sponsors</dt>\
      <dd class="col-sm-7"><a data-bs-toggle="collapse" href="#coSponsorsList" role="button" aria-expanded="false" aria-controls="coSponsorsList">View</a></dd>\
    </dl>\
    <div class="collapse" id="coSponsorsList"><div class="card card-body">' +
          coSponsorHTML +
          '</ul></div></div></div>\
          <div class="modal-footer">\
            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="modal-close">Close</button>\
          </div>\
        </div>\
      </div>\
    </div>';
      }

      $("#modal-wrapper").text("");
      $("#modal-wrapper").append(modalTest);
      $("#modal-close").on("click", function () {
        $("#myModal").hide();
      });
      $("#myModal").show();
      $("#myModal").focus();
    });
  } else {
    modalTest =
      '<div class="modal" role="dialog" id="myModal">\
      <div class="modal-dialog" role="document">\
        <div class="modal-content">\
          <div class="modal-header">\
            <h5 class="modal-title">' +
      data["bill"].title +
      '</h5>\
          </div>\
          <div class="modal-body">\
            <dl class="row">\
      <dt class="col-sm-4">Sponsor</dt>\
      <dd class="col-sm-7">' +
      data["bill"]["sponsors"][0].fullName +
      '</dd>\
      <dt class="col-sm-4">Bill #</dt>\
      <dd class="col-sm-7">\
          ' +
      data["bill"].number +
      '\
      </dd>\
      <dt class="col-sm-4">Introduced</dt>\
      <dd class="col-sm-7">' +
      introducedDate +
      '</dd>\
      <dt class="col-sm-4">Policy Area</dt>\
      <dd class="col-sm-7">' +
      policyArea +
      '</dd>\
      <dt class="col-sm-4">More Info</dt>\
      <dd class="col-sm-7">\
      <a href="https://congress.gov/bill/' +
      data["bill"].congress +
      "/" +
      data["bill"].type.toLowerCase() +
      "/" +
      data["bill"].number +
      ' " target="_blank">View</a>\
      </dd>\
      <dt class="col-sm-4">Co-Sponsors</dt>\
      <dd class="col-sm-7">No Cosponsors Found</dd>\
    </dl>\
    <div class="collapse" id="coSponsorsList"><div class="card card-body" style="text-decoration:underline;">NO COSPONSORS' +
      '</ul></div></div></div>\
          <div class="modal-footer">\
            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="modal-close">Close</button>\
          </div>\
        </div>\
      </div>\
    </div>';
    $("#modal-wrapper").text("");
    $("#modal-wrapper").append(modalTest);
    $("#modal-close").on("click", function () {
      $("#myModal").hide();
    });
    $("#myModal").show();
    $("#myModal").focus();
  }
}


// Find your member functionality
$("#member-submit").on("click", function (e) {
  e.preventDefault();
  $("#memberWrapper").text("");
  let findMemberURL =
    "https://www.googleapis.com/civicinfo/v2/representatives?address=" +
    $("#zipCode").val() +
    "&key=" +
    apiKeys.google +
    "&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody";
  $.ajax({
    type: "GET",
    url: findMemberURL,
    beforeSend: function () {
      let loadingHTML =
        "<div class='spinner-border m-3' role='status'>\
  <span class='visually-hidden'>Loading...</span>\
</div>";
      $("#memberWrapper").append(loadingHTML);
    },
    success: function (data) {
      $("#memberWrapper").html("");
      if (data.officials.length === 0) {
        var memberCardHTML =
          "<h5 class='d-inline-flex mt-3 px-2 py-1 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-2'>This state or district is invalid. Please try again.</h5>";
        $("#memberWrapper").append(memberCardHTML);
      }
      var officeIndex = 0;
      for (let i = 0; i < data.officials.length; i++) {
        let civicAPIMemberNameArray = data["officials"][i]["name"].split(" ");
        let civicAPIMemberName =
          civicAPIMemberNameArray[0] +
          " " +
          civicAPIMemberNameArray[civicAPIMemberNameArray.length - 1];
        let bioguideID = bioguideIdByName[civicAPIMemberName];
        memberCardHTML = "";
        if (0 == 0) {
          let districtIdSplit = data["offices"][1]
            ? data["offices"][1].divisionId.split(":")
            : data["offices"][0].divisionId.split(":");
          let districtNum = districtIdSplit[districtIdSplit.length - 1];
          let chamber = "";
          if (data["offices"][0]["officialIndices"].includes(i)) {
            chamber = data["offices"][0].name;
          }

          if (
            data["offices"][1] &&
            data["offices"][1]["officialIndices"].includes(i)
          ) {
            chamber = data["offices"][1].name;
          }

          if (chamber.toLowerCase() == "u.s. representative") {
            memberCardHTML =
              "<div class='card m-3' style='width: 20rem;' class='rep'" +
              ">" +
              "<div class='card-body'>\
        <h5 class='card-title'>" +
              data["officials"][i].name +
              "</h5>\
        <p class='card-subtitle'><b>Party:</b> " +
              data["officials"][i].party +
              "<br/><b>State:</b> " +
              data["normalizedInput"].state +
              "<br/><b>Office of </b>" +
              chamber +
              "<br/><b>District #: </b>" +
              districtNum +
              "</p>\
        <a  href='/member-desc.html?id=" +
              bioguideID +
              "' class='btn btn-secondary btn-sm mt-2'>Learn more</a>\
      </div>\
    </div>";
          } else {
            memberCardHTML =
              "<div class='card m-3' style='width: 20rem;' class='rep'" +
              ">" +
              "<div class='card-body'>\
      <h5 class='card-title'>" +
              data["officials"][i].name +
              "</h5>\
      <p class='card-subtitle'><b>Party:</b> " +
              data["officials"][i].party +
              "<br/><b>State:</b> " +
              data["normalizedInput"].state +
              "<br/><b>Office of </b>" +
              chamber +
              "<br/>" +
              "</p>\
      <a href='/member-desc.html?id=" +
              bioguideID +
              "' class='btn btn-secondary btn-sm mt-2'>Learn more</a>\
    </div>\
    </div>";
          }
        }
        $("#memberWrapper").append(memberCardHTML);
        if (officeIndex !== 1) {
          officeIndex++;
        }
      }
    },
    error: function (err) {
      $("#memberWrapper").html("");
      $("#memberWrapper").html(
        "<h5 class='d-inline-flex mt-3 px-2 py-1 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-2'>This zip code/address is invalid. Please try again.</h5>"
      );
      console.error(err.statusText, err);
    },
  });
});

// NewsAPI call
$.ajax({
  type: "GET",
  url: "https://newsapi.org/v2/everything?q=congress&apiKey=" + apiKeys.newsApi,
  beforeSend: function () {
    let loadingHTML =
      "<div class='spinner-border m-3' role='status'>\
<span class='visually-hidden'>Loading...</span>\
</div>";
    $("#carouselInner").append(loadingHTML);
  },
  success: function (response) {
    $("#carouselInner").html("");
    let newsUrl;

    for (let i = 0; i < 6; i++) {
      if (response["articles"][i].title === "[Removed]") {
        continue;
      }
      // var index = i;
      if (i === 0) {
        var carouselItemClassCheck = "carousel-item active";
      } else {
        var carouselItemClassCheck = "carousel-item";
      }
      if (response["articles"][i].urlToImage) {
        newsUrl = response["articles"][i].urlToImage;
      } else {
        newsUrl =
          "https://www.shutterstock.com/image-vector/newspaper-line-vector-illustration-isolated-600nw-1928795186.jpg";
        // break;
      }
      let color = "#F7F5F5";
      let carouselItem =
        "<div class='" +
        carouselItemClassCheck +
        "'>\
          <img style='filter: grayscale(100%) blur(1px);' src='" +
        newsUrl +
        "' class='d-block w-100' alt='image'>\
        <div class='carousel-caption d-none d-md-block'>\
          <a target='_blank' style='color:" +
        color +
        "; text-decoration:none; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5)' href='" +
        response["articles"][i].url +
        "'><h5 st >" +
        response["articles"][i].title +
        "</h5></a>\
          <p class='news-desc limited-text'>" +
        response["articles"][i].description +
        "</p>\
          </div>\
        </div>";

      $("#carouselInner").append(carouselItem);
    }
  },
});

$(".carousel").dataInterval = 2000;
