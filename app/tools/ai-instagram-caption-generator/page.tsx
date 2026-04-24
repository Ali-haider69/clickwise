"use client";

import { useState } from "react";
import { Camera, Copy, Check, Sparkles, Loader2, Hash, Smile } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

type Niche = "Food" | "Travel" | "Fitness" | "Tech" | "Fashion" | "Business" | "Lifestyle";
type Mood = "Fun & Playful" | "Motivational" | "Aesthetic" | "Educational" | "Behind the Scenes";
type CaptionLength = "Short (1-2 lines)" | "Medium (3-5 lines)" | "Long (6+ lines)";

const niches: { label: Niche; emoji: string }[] = [
  { label: "Food", emoji: "🍕" },
  { label: "Travel", emoji: "✈️" },
  { label: "Fitness", emoji: "💪" },
  { label: "Tech", emoji: "💻" },
  { label: "Fashion", emoji: "👗" },
  { label: "Business", emoji: "💼" },
  { label: "Lifestyle", emoji: "✨" },
];

const moods: Mood[] = ["Fun & Playful", "Motivational", "Aesthetic", "Educational", "Behind the Scenes"];
const lengths: CaptionLength[] = ["Short (1-2 lines)", "Medium (3-5 lines)", "Long (6+ lines)"];

const nicheHashtags: Record<Niche, string[]> = {
  Food: ["#foodie", "#foodphotography", "#instafood", "#foodlover", "#homecooking", "#foodblogger", "#yummy", "#delicious", "#foodstagram", "#mealprep", "#eeeeeats", "#feedfeed", "#f52grams", "#buzzfeedfood", "#foodporn", "#tasty", "#homemade", "#cheflife", "#cookingathome", "#healthyfood"],
  Travel: ["#travel", "#travelgram", "#wanderlust", "#explore", "#adventure", "#travelphotography", "#instatravel", "#travelblogger", "#traveltheworld", "#backpacker", "#vacation", "#trip", "#traveling", "#traveler", "#worldtraveler", "#discoverearth", "#beautifuldestinations", "#traveladdict", "#travelinspiration", "#passportready"],
  Fitness: ["#fitness", "#workout", "#gym", "#fitnessmotivation", "#fit", "#health", "#healthy", "#training", "#fitlife", "#bodybuilding", "#exercise", "#lifestyle", "#motivation", "#gains", "#personaltrainer", "#fitnessjourney", "#healthylifestyle", "#fitspo", "#fitfam", "#cardio"],
  Tech: ["#tech", "#technology", "#innovation", "#coding", "#programming", "#developer", "#startup", "#software", "#AI", "#gadgets", "#digitallife", "#techtips", "#techcommunity", "#futuretech", "#machinelearning", "#cybersecurity", "#cloudcomputing", "#productivity", "#devlife", "#buildinpublic"],
  Fashion: ["#fashion", "#style", "#ootd", "#fashionblogger", "#outfitoftheday", "#clothing", "#streetstyle", "#fashionista", "#model", "#designer", "#trendy", "#aesthetic", "#vintage", "#styleblogger", "#fashionphotography", "#wiwt", "#instafashion", "#luxuryfashion", "#sustainablefashion", "#outfitinspo"],
  Business: ["#business", "#entrepreneur", "#startup", "#success", "#motivation", "#businessowner", "#marketing", "#mindset", "#leadership", "#smallbusiness", "#hustle", "#entrepreneurship", "#growthmindset", "#businesstips", "#branding", "#socialmediamarketing", "#digitalmarketing", "#contentcreator", "#personalbrand", "#productivity"],
  Lifestyle: ["#lifestyle", "#lifestyleblogger", "#dailylife", "#selfcare", "#wellbeing", "#happiness", "#mindfulness", "#positivevibes", "#blessed", "#gratitude", "#dailyroutine", "#morningroutine", "#wellness", "#personaldevelopment", "#growth", "#inspiration", "#motivation", "#livingmybestlife", "#balance", "#authenticity"],
};

function generateCaption(
  niche: Niche,
  mood: Mood,
  keywords: string,
  includeEmojis: boolean,
  includeHashtags: boolean,
  captionLength: CaptionLength
): string {
  const kw = keywords.trim() || "this moment";
  const e = includeEmojis;

  const shortMap: Record<Mood, Record<Niche, string>> = {
    "Fun & Playful": {
      Food: `Not accepting criticism at this time${e ? " 🍕😂" : "."} ${kw} hits different.`,
      Travel: `Checked in${e ? " ✈️" : ","} checked out of reality${e ? " 😂" : "."}`,
      Fitness: `Gym said I was too intense. They were right${e ? " 💪😅" : "."}`,
      Tech: `My laptop and I are officially in a relationship${e ? " 💻❤️" : "."}`,
      Fashion: `Dressed for the job I want${e ? " 👗✨" : "."} CEO of looking good.`,
      Business: `Building an empire, one coffee at a time${e ? " ☕💼" : "."}`,
      Lifestyle: `Living for the moments that matter${e ? " ✨🤍" : "."}`,
    },
    "Motivational": {
      Food: `Good food, good mood${e ? " 🙌" : "."}. Fuel yourself well.`,
      Travel: `Go where you feel most alive${e ? " 🌍✨" : "."}`,
      Fitness: `Every rep is a vote for the version of you that you want to become${e ? " 💪🔥" : "."}`,
      Tech: `Build the tools the world doesn't have yet${e ? " 💻🚀" : "."}`,
      Fashion: `Wear your confidence louder than your outfit${e ? " 👗🔥" : "."}`,
      Business: `Your future self is watching. Make them proud${e ? " 💼🙏" : "."}`,
      Lifestyle: `Design a life you love${e ? " ✨🌟" : "."}`,
    },
    "Aesthetic": {
      Food: `${kw}${e ? " 🤍" : " —"} simple things, beautifully done.`,
      Travel: `Somewhere between here and everywhere${e ? " 🌿✨" : "."}`,
      Fitness: `Quiet mornings. Strong body. Clear mind${e ? " 🤍" : "."}`,
      Tech: `Minimal setup. Maximum output${e ? " 💻🤍" : "."}`,
      Fashion: `Less is more${e ? " 🤍✨" : ". Always."}`,
      Business: `Calm mind. Clear vision. Consistent action${e ? " 🤍" : "."}`,
      Lifestyle: `Slow down. Notice more${e ? " 🌿🤍" : "."}`,
    },
    "Educational": {
      Food: `Did you know ${kw}? Most people don't${e ? " 👇" : "."}`,
      Travel: `One thing no one tells you about ${kw}${e ? " 👇✈️" : ":"}`,
      Fitness: `The mistake most beginners make with ${kw}${e ? " 👇💪" : ":"}`,
      Tech: `Quick tip on ${kw} that saves me hours every week${e ? " 👇💻" : ":"}`,
      Fashion: `Styling rule for ${kw} nobody talks about${e ? " 👗👇" : ":"}`,
      Business: `The one thing about ${kw} that changed everything for me${e ? " 👇💼" : ":"}`,
      Lifestyle: `What I learned from ${kw} that I wish I knew sooner${e ? " 👇✨" : ":"}`,
    },
    "Behind the Scenes": {
      Food: `Real talk: ${kw} took three tries to get right${e ? " 😅🍕" : "."}`,
      Travel: `What the photos don't show about ${kw}${e ? " 📸✈️" : ":"}`,
      Fitness: `The honest version of ${kw}${e ? " 💪😅" : ":"}`,
      Tech: `What building ${kw} actually looks like${e ? " 💻👀" : ":"}`,
      Fashion: `The real process behind ${kw}${e ? " 🎬👗" : ":"}`,
      Business: `Behind the highlight reel of ${kw}${e ? " 💼📸" : ":"}`,
      Lifestyle: `The unfiltered version of ${kw}${e ? " ✨📸" : ":"}`,
    },
  };

  const mediumMap: Record<Mood, Record<Niche, string>> = {
    "Fun & Playful": {
      Food: `POV: You made ${kw} and it actually worked${e ? " 🍕😂\n\n" : ".\n\n"}The recipe is basically chaos with good intentions. But honestly? Worth every second.\n\nTag someone who needs to try this immediately${e ? " 👇" : "."}`,
      Travel: `Another day, another reason to pack a bag${e ? " ✈️😂\n\n" : ".\n\n"}${kw} was not on my bingo card, yet here we are. Zero regrets.\n\nWhere should I go next? Drop suggestions below${e ? " 👇" : "."}`,
      Fitness: `Me before the gym: "I don't feel like it."\nMe after the gym: unstoppable force of nature${e ? " 💪😂\n\n" : ".\n\n"}${kw} was today's assignment. Survived. See you tomorrow.`,
      Tech: `Current status: deep in ${kw} rabbit hole${e ? " 💻🕳️\n\n" : ".\n\n"}Hours in. No regrets. Send help (and snacks).\n\nWhat are you currently obsessing over?${e ? " 👇" : ""}`,
      Fashion: `Outfit formula that never fails: ${kw} + confidence + not caring what anyone thinks${e ? " 👗✨\n\n" : ".\n\n"}Results speak for themselves.\n\nTag someone who gets it${e ? " 💅" : "."}`,
      Business: `Startup life is basically: have idea, freak out, execute anyway${e ? " 💼😂\n\n" : ".\n\n"}Currently in the execute phase with ${kw}. Pray for me.\n\nEntrepreneurs — what's your current chaos?${e ? " 👇" : ""}`,
      Lifestyle: `Life update: chose ${kw} over everything else today${e ? " ✨😂\n\n" : ".\n\n"}Zero apologies. Full send.\n\nWhat's your unpopular priority right now?`,
    },
    "Motivational": {
      Food: `Nourishing your body is an act of self-respect${e ? " 🍽️\n\n" : ".\n\n"}Today that looked like ${kw}. Simple, intentional, good.\n\nWhat you eat shapes more than your body — it shapes your energy, your mood, your output. Feed yourself well${e ? " 🙏" : "."}`,
      Travel: `You don't need the perfect plan. You need a ticket and the courage to go${e ? " ✈️🌍\n\n" : ".\n\n"}${kw} reminded me: the best experiences come from saying yes before you feel ready.\n\nStop waiting for permission to explore your life${e ? " 🔥" : "."}`,
      Fitness: `Every workout is a promise you keep to yourself${e ? " 💪\n\n" : ".\n\n"}${kw} today was hard. Everything worth doing is. But the version of you on the other side of hard is who you're actually building.\n\nShow up. Even when it's the last thing you feel like doing${e ? " 🔥" : "."}`,
      Tech: `The builders who change the world aren't waiting for perfect conditions${e ? " 💻🚀\n\n" : ".\n\n"}They build with what they have. They ship. They learn. They go again.\n\n${kw} is what I'm building right now. One day at a time${e ? " 🙏" : "."}`,
      Fashion: `Style is a form of self-expression — and self-expression is power${e ? " 👗🔥\n\n" : ".\n\n"}Don't dress for who others want you to be. Dress for the version of yourself you're actively becoming.\n\n${kw} today. Intentional and unapologetic${e ? " ✨" : "."}`,
      Business: `The gap between where you are and where you want to be is bridged by daily decisions${e ? " 💼🔥\n\n" : ".\n\n"}${kw} is what I'm committing to this week.\n\nSmall steps. Consistent action. Compound results${e ? " 🙏" : "."}`,
      Lifestyle: `Build a life that doesn't need a vacation from it${e ? " ✨\n\n" : ".\n\n"}That's the goal with ${kw}. Not perfection — just alignment.\n\nWhat does that look like for you?`,
    },
    "Aesthetic": {
      Food: `${kw}${e ? " 🤍\n\n" : ".\n\n"}There's something quietly powerful about making food with care. The slowness of it. The intention.\n\nThe best meals aren't always the fanciest ones.`,
      Travel: `${kw}${e ? " 🌿\n\n" : ".\n\n"}Some places don't ask for words. They ask for presence.\n\nThis was one of those places. Still processing it honestly${e ? " ✨" : "."}`,
      Fitness: `Morning light. Still body. Focused mind${e ? " 🤍\n\n" : ".\n\n"}${kw} before the noise starts. This hour belongs to no one else.\n\nThere's a certain kind of peace only early risers understand${e ? " 🌤️" : "."}`,
      Tech: `Clean workspace. Clear thoughts${e ? " 💻🤍\n\n" : ".\n\n"}${kw} is what I'm building in the quiet hours.\n\nLess clutter. More depth. Always${e ? " ✨" : "."}`,
      Fashion: `${kw}${e ? " 🤍✨\n\n" : ".\n\n"}Some outfits aren't about being seen. They're about feeling like yourself.\n\nToday was that kind of day.`,
      Business: `The most important work often looks the quietest from the outside${e ? " 🤍\n\n" : ".\n\n"}${kw} is what's happening here. Slow and intentional.\n\nBuilding takes patience${e ? " 🌱" : "."}`,
      Lifestyle: `Life lately: ${kw}${e ? " 🌿🤍\n\n" : ".\n\n"}Choosing stillness when the world demands noise.\n\nIt's a practice, not a destination${e ? " ✨" : "."}`,
    },
    "Educational": {
      Food: `Most people cook ${kw} wrong — and it's a simple fix${e ? " 👇🍕\n\n" : ".\n\n"}The key is patience with heat. Most home cooks rush it. Slow down, and the flavor completely changes.\n\nTry it this week and tell me if I'm wrong${e ? " 👀" : "."}`,
      Travel: `3 things I wish I knew before visiting ${kw}${e ? " ✈️👇\n\n" : ":\n\n"}1. Timing matters more than you think.\n2. The tourist spots are overrated.\n3. Talk to locals — always.\n\nSave this for your next trip${e ? " 🔖" : "."}`,
      Fitness: `The truth about ${kw} that most fitness content won't tell you${e ? " 💪👇\n\n" : ":\n\n"}Progress isn't linear. Bad weeks aren't failures. The only thing that matters is whether you came back.\n\nSave this for when you need the reminder${e ? " 🔖" : "."}`,
      Tech: `Quick win with ${kw} that saves me 2+ hours weekly${e ? " 💻👇\n\n" : ":\n\n"}Set up a system once. Let it run. Review weekly. Adjust monthly.\n\nMost people over-engineer it — keep it simple${e ? " 🙏" : "."}`,
      Fashion: `The styling hack for ${kw} that changed my whole wardrobe approach${e ? " 👗👇\n\n" : ":\n\n"}Buy less. Choose intentionally. Repeat outfits unapologetically.\n\nCapsule wardrobes aren't boring — they're freeing${e ? " ✨" : "."}`,
      Business: `What ${kw} taught me about growing a business that no course covered${e ? " 💼👇\n\n" : ":\n\n"}Execution beats strategy every time. A good plan done imperfectly wins against a perfect plan never started.\n\nSave this${e ? " 🔖" : "."}`,
      Lifestyle: `One habit that shifted everything for me around ${kw}${e ? " 👇✨\n\n" : ":\n\n"}Doing it before I felt motivated, not after. Motivation follows action — not the other way around.\n\nTry it for a week${e ? " 🙏" : "."}`,
    },
    "Behind the Scenes": {
      Food: `Real talk: ${kw} took three attempts to get right${e ? " 😅🍕\n\n" : ".\n\n"}Attempt one — burnt. Attempt two — edible but embarrassing. Attempt three — this.\n\nPerfection is overrated. Keep going${e ? " 🙏" : "."}`,
      Travel: `What ${kw} actually looked like vs the photo${e ? " 📸😂\n\n" : ":\n\n"}The photo: golden light, peaceful moment.\nThe reality: 47 attempts, wrong settings, two strangers photobombing.\n\nBut that's kind of the point, right${e ? " ✈️" : "?"}`,
      Fitness: `Behind the post: ${kw} was not graceful${e ? " 💪😅\n\n" : ".\n\n"}I was tired, distracted, and almost didn't go. But I went.\n\nThat's the only flex that matters — showing up when it's inconvenient${e ? " 🔥" : "."}`,
      Tech: `Honest look at building ${kw}${e ? " 💻👀\n\n" : ":\n\n"}Day 1: Excited. Day 14: Questioning everything. Day 30: Something actually works.\n\nThe middle part is where most people quit. Don't quit in the middle${e ? " 🙏" : "."}`,
      Fashion: `The behind the scenes of this ${kw} look${e ? " 🎬👗\n\n" : ":\n\n"}6 outfits tried. 3 discarded. One lighting change. One retake.\n\nThe magic is in the mess${e ? " ✨" : "."}`,
      Business: `What building ${kw} really looks like${e ? " 💼📸\n\n" : ":\n\n"}Not the polished version. The messy, figuring-it-out-in-real-time version.\n\nIf you're in the weeds right now — same. We'll figure it out${e ? " 🙏" : "."}`,
      Lifestyle: `The unfiltered version of ${kw}${e ? " ✨📸\n\n" : ":\n\n"}Not everything is aesthetic. Not everything is planned. Most of it is just life, happening.\n\nAnd somehow that's the best part${e ? " 🤍" : "."}`,
    },
  };

  const longMap: Record<Mood, Record<Niche, string>> = {
    "Fun & Playful": {
      Food: `Nobody asked for my opinion on ${kw} but here it is anyway${e ? " 🍕😂\n\n" : ".\n\n"}I have been thinking about this for genuinely too long. An embarrassing amount of time for a normal adult person.\n\nHot take: most people overcomplicate it. Strip it back. Use good ingredients. Don't rush the process. And for the love of all that is good — taste as you go.\n\nThis is the hill I will die on.\n\nAlso I made it today and it was excellent and I will not be taking questions at this time${e ? " 😌✨\n\n" : ".\n\n"}Tag your foodie friend who needs this energy in their life${e ? " 👇" : "."}`,
      Travel: `Hot take: ${kw} is underrated and I will not stop talking about it${e ? " ✈️😂\n\n" : ".\n\n"}Everyone's obsessed with the same five destinations. Meanwhile, this place is sitting here being magical and nobody's paying attention.\n\nI got there, looked around, and immediately started planning when I could come back.\n\nThe food was exceptional. The people were kind. The light was unreal.\n\nI've traveled a lot and this one genuinely surprised me. Which is honestly the best feeling in travel.\n\nWhere have you been that completely exceeded your expectations?${e ? " 👇✈️" : ""}`,
      Fitness: `Gym update: survived ${kw}${e ? " 💪😅\n\n" : ".\n\n"}This is not a humblebrag. It was genuinely a chaotic session. Music too loud. Form questionable. Took a 7-minute break that was technically not a rest period.\n\nAnd yet.\n\nGot it done. Checked the box. The version of me that didn't want to go is somewhere regretting it and the version of me that went is absolutely thriving.\n\nIf you're procrastinating your workout right now — this is your sign. Just go. The worst workout you do beats the best one you never do${e ? " 🔥" : "."}`,
      Tech: `I have been down a ${kw} rabbit hole for six hours${e ? " 💻🕳️\n\n" : ".\n\n"}What started as "let me just quickly check one thing" turned into a complete restructuring of how I think about this entire space.\n\nMost of the conventional wisdom is outdated by 18 months. The edge is in understanding what current tools can do when you combine them intentionally.\n\nI've been taking notes. It's going to become a post. A long one.\n\nFor now — what are you currently obsessing over in tech? Drop it below${e ? " 👇💻" : "."}`,
      Fashion: `Outfit formula I discovered by accident and now can't stop using${e ? " 👗✨\n\n" : ":\n\n"}One statement piece. Everything else in neutrals. One unexpected texture. Refuse to overthink it.\n\nThat's it. That's the whole formula.\n\n${kw} is today's result and honestly? One of my favorite looks in recent memory.\n\nThe style people who told me to buy less and choose better were completely right and I'm not above admitting it.\n\nWhat's your current outfit formula? I'm always stealing ideas${e ? " 😂👇" : "."}`,
      Business: `Current business status: chaos, but make it productive${e ? " 💼😂\n\n" : ".\n\n"}${kw} is the project consuming my life right now. And I mean that in the most loving way possible.\n\nThere's something about being genuinely deep in building something that just hits different. The problems are real. The stakes feel high. The feedback loop is tight.\n\nBut the days when things come together? Unmatched feeling.\n\nWhat are you currently building? Entrepreneurs and founders, let's commiserate${e ? " 👇💼" : "."}`,
      Lifestyle: `Unpopular opinion: ${kw} is the best thing I've added to my life this year${e ? " ✨😂\n\n" : ".\n\n"}I know. Everyone's got their thing. But hear me out.\n\nIt's not that it's life-changing on its own. It compounds. You do it once, feel marginally better. A week in, you notice a shift. A month in and it's just who you are.\n\nThat's the magic of small consistent things that don't feel like they're working until one day they clearly are.\n\nWhat's your underrated habit recently? I want to steal ideas${e ? " 👇" : "."}`,
    },
    "Motivational": {
      Food: `Food is so much more than fuel${e ? " 🍽️\n\n" : ".\n\n"}It's culture. It's memory. It's the way we take care of people we love.\n\nWhen you make something with intention — even something simple like ${kw} — you're doing something quietly radical. You're saying: this moment, and the people in it, deserve effort.\n\nIn a world that rewards speed, choosing to slow down and cook is a kind of rebellion.\n\nFeed yourself well. Feed the people around you well.\n\nThe table is one of the most powerful places in the world${e ? " 🙏✨" : "."}`,
      Travel: `The world is genuinely too big to stay in one place your whole life${e ? " 🌍✈️\n\n" : ".\n\n"}I'm not saying quit your job and become a nomad. I'm saying: make the trip. Plan the thing. Book the ticket before you have the money figured out, because you will figure the money out.\n\nThe experiences you collect can never be taken from you. The memories you make in places like ${kw} are yours forever.\n\nSo many people are waiting for the perfect time. There is no perfect time. There is only now.\n\nGo somewhere new this year. Even somewhere small. Just go${e ? " 🙏🌍" : "."}`,
      Fitness: `You don't have to want to work out${e ? " 💪\n\n" : ".\n\n"}The fitness industry has built its entire identity around motivation — and motivation is one of the least reliable tools you have.\n\nThe people who are consistently fit aren't more motivated than you. They've just accepted that they'll show up even when they don't want to.\n\nThat's the whole secret. Not the perfect program. Not the supplement. Not the right gym.\n\nShow up anyway. Especially when ${kw} is hard. Especially when you're tired.\n\nThose are the sessions that actually build you${e ? " 🔥🙏" : "."}`,
      Tech: `Every tool that exists today was once someone's ridiculous idea${e ? " 💻🚀\n\n" : ".\n\n"}The thing you're building — the thing that feels too ambitious, too early, too weird — might be exactly what someone desperately needs.\n\nI think about this when I'm deep in ${kw} and questioning whether it's worth it.\n\nIt's worth it. Keep going.\n\nThe builders who change things are never the ones who waited for perfect conditions. They shipped anyway. Iterated relentlessly. Refused to let rejection be an ending.\n\nBuild the thing${e ? " 🙏🔥" : "."}`,
      Fashion: `Your style is a form of communication — and you have more to say than you think${e ? " 👗✨\n\n" : ".\n\n"}So many people dress as camouflage. Blend in. Don't invite attention or judgment.\n\nBut the people who've found genuine personal style stopped dressing for others and started dressing for the version of themselves they're actively building.\n\nThat's what ${kw} is for me today. Not a fashion statement. A personal one.\n\nYou get to decide who you are every morning. Use that power${e ? " 🔥🙏" : "."}`,
      Business: `No one is coming to save your business${e ? " 💼🔥\n\n" : ".\n\n"}Not the investor. Not the perfect hire. Not the viral post. Not the lucky break.\n\nThe sooner you accept that, the sooner everything changes.\n\nWhen you stop waiting to be saved, you start building systems. You start making decisions. You start treating every day as data you're collecting about what works.\n\n${kw} is what I'm executing on this week. Not perfectly. Not with all the resources I'd want.\n\nBut executing. And that's all that matters${e ? " 🙏" : "."}`,
      Lifestyle: `The life you want is not waiting behind some major breakthrough${e ? " ✨\n\n" : ".\n\n"}It's accumulating in the small choices you make every single day.\n\nThe morning you protect. The food you choose. The people you give your energy to. The work you actually do versus the work you think about doing.\n\n${kw} is one of those small choices for me. It doesn't look like much from the outside. But it compounds.\n\nEverything compounds.\n\nBuild the day you want to live, one small choice at a time${e ? " 🙏🌱" : "."}`,
    },
    "Aesthetic": {
      Food: `There's a particular kind of beauty in slow cooking${e ? " 🤍\n\n" : ".\n\n"}${kw} today. The kitchen smelled incredible. The light was just right. It was one of those moments that makes you understand why people spend their lives learning to cook.\n\nFood made with intention tastes different. I'm convinced of this. The care you bring to it transfers.\n\nIf you've been eating quickly, standing up, barely tasting — give yourself one slow meal this week. Make something. Sit with it.\n\nIt's a small thing that changes the whole texture of a day${e ? " 🌿✨" : "."}`,
      Travel: `${kw}${e ? " 🌿✨\n\n" : ".\n\n"}There are places that feel like they exist slightly outside of time. Where the light does something particular in the late afternoon and you find yourself just standing still, trying to remember it.\n\nThis was one of those places.\n\nI don't always have words immediately. Sometimes a place needs to settle before I can speak about it honestly.\n\nBut this one — I'll carry it with me for a while.\n\nSome experiences aren't meant to be shared immediately. Let them sit. Let them become part of you first${e ? " 🤍" : "."}`,
      Fitness: `5am${e ? " 🤍\n\n" : ".\n\n"}Before the world decides what the day will feel like, there's this quiet window. An hour that belongs to no one else.\n\n${kw} in the stillness. No music today. Just presence.\n\nThere's something almost meditative about physical effort when you're not performing it for anyone. When it's just you and the work.\n\nI started doing this for my body. I stayed for what it does to my mind.\n\nIf you've never tried early mornings, I understand. I used to be a skeptic too${e ? " 🌤️🤍" : "."}`,
      Tech: `Minimalism in a workspace isn't about aesthetics${e ? " 💻🤍\n\n" : ".\n\n"}It's about signal vs noise.\n\nEvery object in your environment asks something of your attention. Most of it asks for very little and gives back almost nothing.\n\nI stripped my setup back. Kept only what earned its place.\n\nWhat remained: ${kw}, good light, and enough space to think clearly.\n\nThe quality of thought changed. I didn't expect that, but it did${e ? " ✨" : "."}`,
      Fashion: `Quiet luxury isn't a trend${e ? " 🤍✨\n\n" : ".\n\n"}It's a philosophy.\n\nThe idea that the most considered choices don't announce themselves. They're felt rather than seen. Quality that lives in the weight of the fabric, the precision of the cut, the way something moves when you move.\n\n${kw} today. Nothing loud. Nothing performative.\n\nJust: intentional, slow, good.\n\nThat's the whole aspiration${e ? " 🌿" : "."}`,
      Business: `The most important work I do is usually invisible${e ? " 🤍\n\n" : ".\n\n"}Not the posts. Not the launches. Not the meetings.\n\nThe thinking. The reading. The long walks where things become clear.\n\n${kw} is the output of a lot of invisible work lately.\n\nThe quality of what you produce is directly proportional to the quality of your thinking space — and most people never protect it.\n\nGuard your quiet time${e ? " 🌿✨" : "."}`,
      Lifestyle: `I am slowly, deliberately building a quieter life${e ? " 🌿🤍\n\n" : ".\n\n"}This is not about withdrawing. It's about choosing.\n\nChoosing what gets my attention. What gets my evenings. What gets the most alive version of me.\n\n${kw} is part of that. It doesn't look dramatic from the outside.\n\nBut the interior experience of a life designed around what actually matters — that's the whole point.\n\nWe talk a lot about building careers. We talk less about building a life that genuinely feels good to live${e ? " ✨" : "."}`,
    },
    "Educational": {
      Food: `The single biggest mistake people make with ${kw}${e ? " 🍕👇\n\n" : ":\n\n"}They don't read the room.\n\nCooking is responsive. It's not just following instructions — it's paying attention. The sound of the pan. The color of the edges. The smell at different stages.\n\nWhat I've learned:\n1. Heat management matters more than any single ingredient.\n2. Seasoning in layers is the difference between good and great.\n3. Rest time is part of the cooking time.\n4. Your senses are better tools than your timer.\n\nSave this. Try it. Tell me what changes${e ? " 👇🔖" : "."}`,
      Travel: `5 things that will make your next trip genuinely better${e ? " ✈️👇\n\n" : ":\n\n"}1. Book accommodation outside the tourist center. Walk to sights, live like a local.\n2. Arrive one day early. Beat jet lag before your trip officially starts.\n3. Learn 10 phrases in the local language. The warmth you receive in return is remarkable.\n4. Build one completely unplanned day into every trip.\n5. Eat where there are no photos on the menu.\n\n${kw} taught me most of these.\n\nSave for your next adventure${e ? " 🔖✈️" : "."}`,
      Fitness: `The most underrated principle in fitness that nobody talks about enough${e ? " 💪👇\n\n" : ":\n\n"}Minimum effective dose.\n\nYou don't need to optimize everything. Find the least amount of effort that produces results you want — then be consistent.\n\nHere's why: sustainability beats intensity every time. The person who works out moderately for five years beats the person who trains intensely for three months and burns out.\n\n${kw} is my minimum effective dose right now. Consistent. Manageable. Sustainable.\n\nWhat's yours?${e ? " 👇💪" : ""}`,
      Tech: `The ${kw} workflow that changed how I work${e ? " 💻👇\n\n" : ":\n\n"}Most people use their tools reactively. They open things when needed. Respond when pinged. Work inside someone else's priority system.\n\nIntentional tech use looks like:\n1. Set contexts, not just tasks.\n2. Batch similar work ruthlessly.\n3. Turn notifications off during deep work. Not muted — off.\n4. Review your tools quarterly. Delete what you haven't used in 30 days.\n\nImplementing this took two weeks to feel natural. The productivity shift came in three days.\n\nSave and implement${e ? " 🔖💻" : "."}`,
      Fashion: `Why most wardrobes are both full and frustrating${e ? " 👗👇\n\n" : ":\n\n"}It's not about having too much or too little. It's about buying pieces that don't relate to each other.\n\nThe rule that fixed this for me:\n\nEvery new piece must work with at least 3 things you already own. If it doesn't, put it back.\n\nThis one filter reduced my impulse buys by 80%. My cost-per-wear went way down. Getting dressed became genuinely easy.\n\n${kw} passes the test. That's why it's here.\n\nSave this if you're in a wardrobe rut${e ? " 🔖" : "."}`,
      Business: `The business lesson that took me too long to learn${e ? " 💼👇\n\n" : ":\n\n"}Clarity about who you're NOT for is as important as knowing who you are for.\n\nMost early businesses try to serve everyone. The result: shallow relationships, confused messaging, exhausted founders.\n\nThe moment I got specific about ${kw} — who it was for, what problem it solved, who I was not targeting — everything simplified.\n\nContent got easier. Sales calls got shorter. The right clients started finding me.\n\nSpecificity is a competitive advantage.\n\nSave this${e ? " 🔖💼" : "."}`,
      Lifestyle: `The one thing I changed that improved my life more than anything else${e ? " ✨👇\n\n" : ":\n\n"}I got ruthless about my first hour.\n\nFor years I started mornings reactively — phone, notifications, news, other people's urgency. I was giving away my sharpest thinking to the least important inputs.\n\nNow: ${kw} first. No phone for 60 minutes after waking.\n\nWhat changed:\n1. Clearer thinking throughout the day.\n2. Less anxiety by default.\n3. A sense of agency that used to feel impossible before 10am.\n\nTry it for one week and report back${e ? " 👇🙏" : "."}`,
    },
    "Behind the Scenes": {
      Food: `Real, unfiltered truth about making ${kw}${e ? " 🍕😅\n\n" : ":\n\n"}Attempt one was confidently awful. I knew it was going wrong halfway through and kept going anyway — a character flaw I am actively working on.\n\nAttempt two was edible but embarrassing. I ate it alone and told no one.\n\nAttempt three was this.\n\nThe secret to the photo is 40 minutes of prep, one completely thrown-out batch, and a kitchen that looked like a crime scene.\n\nThis is what "making it look easy" actually looks like from the inside.\n\nKeep going on the thing you're figuring out. The good attempt is usually the third one${e ? " 🙏" : "."}`,
      Travel: `The real story behind this ${kw} photo${e ? " 📸✈️\n\n" : ":\n\n"}The photo suggests a spontaneous, perfectly-lit moment.\n\nThe reality: wrong lens. Three tour groups walking through the frame. I tripped over a step I didn't see and caught myself at the last second.\n\nThen the light did something extraordinary for about four minutes.\n\nThat's when this happened.\n\nTravel photography teaches you that the best moments are usually preceded by the most chaotic ones.\n\nThe chaos is part of the process${e ? " 🙏✈️" : "."}`,
      Fitness: `What today's training session actually looked like${e ? " 💪😅\n\n" : ":\n\n"}Instagram version: strong, focused, in the zone.\n\nReal version: almost didn't go. Sat in my car for 6 minutes. First 20 minutes were rough and I questioned every decision that led me here.\n\nThen something shifted — as it always does — and the rest was decent.\n\n${kw} is what I'm working through. It's not clean. It's not always inspiring. It's just: show up, do the work, trust the process.\n\nIf training feels like a slog right now — that's normal. Keep going. The consistency is building something even when you can't see it${e ? " 🔥🙏" : "."}`,
      Tech: `Behind the project: what building ${kw} has actually looked like${e ? " 💻👀\n\n" : ":\n\n"}Week 1: Everything is possible and I am very smart.\nWeek 2: Nothing works and I understand nothing.\nWeek 3: Slowly climbing back. One thing works, then another.\nWeek 4: Starting to see the actual shape of what this is.\n\nThe highlight reel misses weeks two and three.\n\nEvery project I've shipped has had a week two. The difference between what I finished and what I abandoned is whether I kept going through it.\n\nIf you're in the messy middle — same. Keep going.\n\nWeek four is worth it${e ? " 🙏💻" : "."}`,
      Fashion: `Honest behind the scenes of this look${e ? " 🎬👗\n\n" : ":\n\n"}Photo 1: good light, wrong energy. Deleted.\nPhotos 2-12: various combinations of problems I won't detail.\nPhoto 13: this one.\n\nI post the good one. I keep the 12 that didn't work as evidence that the process is part of it.\n\n${kw} took about 45 minutes to capture properly. Most things worth sharing take longer than they look.\n\nWhat you see polished online is rarely the whole story. The mess is real. The effort is real. The result is just the part that made the cut${e ? " 🙏✨" : "."}`,
      Business: `What this week building ${kw} actually looked like${e ? " 💼📸\n\n" : ":\n\n"}Monday: two things worked, one thing I thought was done broke completely.\nTuesday: full replanning. Scrapped three weeks of work.\nWednesday: rebuilt the right way. Faster than expected.\nThursday: first real user feedback. Mixed but useful.\nFriday: fixed what they pointed out. Shipped a better version.\n\nNet result: further along than last week, less certain about the roadmap, more certain about the problem I'm solving.\n\nBuilding is not linear. The willingness to scrap what isn't working and rebuild is the actual skill.\n\nIf you're in a rebuild phase — you're not behind. You're refining${e ? " 🙏💼" : "."}`,
      Lifestyle: `What this aesthetic-looking lifestyle post is leaving out${e ? " ✨📸\n\n" : ":\n\n"}The mornings that didn't go to plan. The week I completely fell off my routines. The days where the "calm, intentional life" I talk about was held together with caffeine and sheer willpower.\n\n${kw} is part of my life. So is the messier version.\n\nI share the parts that feel good because that's what I'm genuinely proud of. But I want to be honest that the good parts exist inside a full life that includes the hard parts.\n\nYou're not doing it wrong if it's not always pretty. Neither am I.\n\nWe're all just figuring it out${e ? " 🙏🤍" : "."}`,
    },
  };

  let caption = "";

  if (captionLength === "Short (1-2 lines)") {
    caption = shortMap[mood]?.[niche] ?? `${kw}${e ? " ✨" : " —"} making every moment count.`;
  } else if (captionLength === "Medium (3-5 lines)") {
    caption = mediumMap[mood]?.[niche] ?? `${kw}\n\nSome moments are worth pausing for${e ? " ✨" : "."}`;
  } else {
    caption = longMap[mood]?.[niche] ?? `${kw}\n\nThis is the full story behind the moment${e ? " ✨" : "."}\n\nEvery experience teaches something if you pay attention.\n\nWhat's yours been lately?`;
  }

  if (includeHashtags) {
    const tags = nicheHashtags[niche].slice(0, 20);
    caption += `\n\n.\n.\n.\n${tags.join(" ")}`;
  }

  return caption;
}

export default function InstagramCaptionGenerator() {
  const [niche, setNiche] = useState<Niche>("Lifestyle");
  const [mood, setMood] = useState<Mood>("Motivational");
  const [keywords, setKeywords] = useState("");
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [captionLength, setCaptionLength] = useState<CaptionLength>("Medium (3-5 lines)");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    setLoading(true);
    setResult("");
    setTimeout(() => {
      setResult(generateCaption(niche, mood, keywords, includeEmojis, includeHashtags, captionLength));
      setLoading(false);
    }, 1200);
  }

  function handleCopy() {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <main style={{ minHeight: "100vh", paddingTop: "7rem", paddingBottom: "4rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
      {/* Header */}
      <div style={{ maxWidth: 700, margin: "0 auto 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "0.75rem",
              background: "linear-gradient(135deg, #e1306c, #f77737)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Camera size={22} color="#fff" />
          </div>
          <h1 className="gradient-text" style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
            AI Instagram Caption Generator
          </h1>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", margin: 0 }}>
          Generate viral Instagram captions with hashtags — 100% free
        </p>
      </div>

      {/* Form */}
      <div
        className="glass"
        style={{ maxWidth: 700, margin: "0 auto 1.5rem", borderRadius: "1.25rem", padding: "1.75rem" }}
      >
        {/* Niche */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            Select Your Niche
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
            {niches.map(({ label, emoji }) => (
              <button
                key={label}
                onClick={() => setNiche(label)}
                style={{
                  padding: "0.625rem 0.5rem",
                  borderRadius: "0.75rem",
                  border: niche === label ? "none" : "1px solid var(--border-color)",
                  background:
                    niche === label
                      ? "linear-gradient(to right, #e1306c, #f77737)"
                      : "var(--bg-card)",
                  color: niche === label ? "#fff" : "var(--text-secondary)",
                  fontWeight: niche === label ? 600 : 400,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.25rem",
                  transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            Caption Mood
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                style={{
                  padding: "0.5rem 0.875rem",
                  borderRadius: "0.6rem",
                  border: mood === m ? "none" : "1px solid var(--border-color)",
                  background:
                    mood === m
                      ? "linear-gradient(to right, #7c3aed, #2563eb)"
                      : "var(--bg-card)",
                  color: mood === m ? "#fff" : "var(--text-secondary)",
                  fontWeight: mood === m ? 600 : 400,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            Keywords or photo description <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. sunset at the beach, golden hour"
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Length */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            Caption Length
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {lengths.map((l) => (
              <button
                key={l}
                onClick={() => setCaptionLength(l)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.6rem",
                  border: captionLength === l ? "none" : "1px solid var(--border-color)",
                  background:
                    captionLength === l
                      ? "linear-gradient(to right, #7c3aed, #2563eb)"
                      : "var(--bg-card)",
                  color: captionLength === l ? "#fff" : "var(--text-secondary)",
                  fontWeight: captionLength === l ? 600 : 400,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <button
            onClick={() => setIncludeEmojis(!includeEmojis)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.6rem",
              border: includeEmojis ? "none" : "1px solid var(--border-color)",
              background: includeEmojis ? "linear-gradient(to right, #7c3aed, #2563eb)" : "var(--bg-card)",
              color: includeEmojis ? "#fff" : "var(--text-secondary)",
              fontWeight: includeEmojis ? 600 : 400,
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <Smile size={15} />
            Include Emojis
          </button>

          <button
            onClick={() => setIncludeHashtags(!includeHashtags)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.6rem",
              border: includeHashtags ? "none" : "1px solid var(--border-color)",
              background: includeHashtags ? "linear-gradient(to right, #7c3aed, #2563eb)" : "var(--bg-card)",
              color: includeHashtags ? "#fff" : "var(--text-secondary)",
              fontWeight: includeHashtags ? 600 : 400,
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <Hash size={15} />
            Include Hashtags
          </button>
        </div>

        {/* Generate */}
        <button
          className="btn-primary"
          onClick={handleGenerate}
          disabled={loading}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {loading ? (
            <>
              <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
              Crafting your caption...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Instagram Caption
            </>
          )}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div
          className="glass"
          style={{ maxWidth: 700, margin: "0 auto", borderRadius: "1.25rem", padding: "1.75rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Your Instagram Caption
            </h2>
            <button
              className="btn-ghost"
              onClick={handleCopy}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem" }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied!" : "Copy caption"}
            </button>
          </div>
          <textarea
            readOnly
            value={result}
            rows={12}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
          <p style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {result.length} characters · {result.split(/\s+/).filter(Boolean).length} words
          </p>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <RelatedTools currentTool="ai-instagram-caption-generator" />
    </main>
  );
}
