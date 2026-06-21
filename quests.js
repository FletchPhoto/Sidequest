// Sidequest data. Edit freely — add your own quests below or use the in-app editor.
//
// Quest shape:
//   { id, title, desc, rarity, spice, time, budget, minLads, tags }
//     rarity:  'common' | 'rare' | 'legendary' | 'mythic'
//     spice:   'wholesome' | 'cheeky' | 'fullsend'
//     time:    'quick' (<=1h) | 'half' (half day) | 'full' (full day)
//     budget:  'free' | 'cheap' | 'splurge'
//     minLads: 2 | 3 | 4 | 5   (minimum lads it works with)

window.SIDEQUEST_DATA = {
  quests: [
    // ---------------- WHOLESOME ----------------
    { id: 'w1', title: 'Geocache Crawl', desc: 'Pick 5 geocaches across town and bag the lot before sundown. Phone the GPS, trust the boys.', rarity: 'common', spice: 'wholesome', time: 'half', budget: 'free', minLads: 2, tags: ['outdoors','adventure'] },
    { id: 'w2', title: 'Build the Ultimate Fort', desc: 'Sofas, sheets, fairy lights, snacks. It must fit every lad inside at once. No exceptions.', rarity: 'common', spice: 'wholesome', time: 'quick', budget: 'free', minLads: 2, tags: ['chill','home'] },
    { id: 'w3', title: 'Sunrise Summit', desc: 'Be on top of the nearest hill before the sun clears the horizon. Bring a flask. Earn it.', rarity: 'rare', spice: 'wholesome', time: 'half', budget: 'free', minLads: 2, tags: ['outdoors','early'] },
    { id: 'w4', title: 'Charity Shop Drip', desc: 'Â£10 each, charity shops only. Build the worst/best outfit. Wear it the rest of the day.', rarity: 'common', spice: 'wholesome', time: 'half', budget: 'cheap', minLads: 3, tags: ['town','funny'] },
    { id: 'w5', title: 'Pancake Iron Chef', desc: 'Split into teams. Best stack wins. Loser does the washing up for everyone.', rarity: 'common', spice: 'wholesome', time: 'quick', budget: 'cheap', minLads: 4, tags: ['food','home'] },
    { id: 'w6', title: 'Park Decathlon', desc: 'Invent 10 events in the local park. Keep score. Crown a champion of nonsense.', rarity: 'rare', spice: 'wholesome', time: 'half', budget: 'free', minLads: 4, tags: ['outdoors','competitive'] },
    { id: 'w7', title: 'Mystery Bus Roulette', desc: 'Take the first bus that arrives. Get off in 30 mins. Make the most of wherever you land.', rarity: 'rare', spice: 'wholesome', time: 'full', budget: 'cheap', minLads: 2, tags: ['adventure','random'] },
    { id: 'w8', title: 'Retro Game Gauntlet', desc: 'Dig out the old console. Single-elimination tournament. Winner picks dinner.', rarity: 'common', spice: 'wholesome', time: 'half', budget: 'free', minLads: 3, tags: ['chill','competitive'] },
    { id: 'w9', title: 'Disposable Camera Day', desc: 'One disposable camera, 27 shots, shared between you. No deleting. Get it developed.', rarity: 'rare', spice: 'wholesome', time: 'full', budget: 'cheap', minLads: 2, tags: ['memories','town'] },
    { id: 'w10', title: 'Cook a 3-Course Banger', desc: 'Starter, main, pud. Each lad owns one course. No takeaways allowed.', rarity: 'common', spice: 'wholesome', time: 'half', budget: 'cheap', minLads: 3, tags: ['food','home'] },
    { id: 'w11', title: 'The Forgotten Landmark', desc: 'Find a local landmark none of you have ever actually visited. Go. Learn one fact each.', rarity: 'common', spice: 'wholesome', time: 'half', budget: 'free', minLads: 2, tags: ['town','adventure'] },
    { id: 'w12', title: 'Wild Swim', desc: 'Find a legal, safe spot of open water and get in. Bragging rights forever.', rarity: 'legendary', spice: 'wholesome', time: 'half', budget: 'free', minLads: 2, tags: ['outdoors','brave'] },
    { id: 'w13', title: 'Build & Race', desc: 'Â£5 each at the hardware shop. Build a vehicle that rolls downhill. Race it.', rarity: 'rare', spice: 'wholesome', time: 'half', budget: 'cheap', minLads: 3, tags: ['build','competitive'] },
    { id: 'w14', title: 'Random Acts Run', desc: 'Do 5 genuinely kind things for strangers before the day ends. Photograph none of them.', rarity: 'legendary', spice: 'wholesome', time: 'full', budget: 'cheap', minLads: 2, tags: ['wholesome','town'] },

    // ---------------- CHEEKY ----------------
    { id: 'c1', title: 'Pub Golf: Back Nine', desc: '9 pubs, 9 drinks, par for each. Lowest score (and still standing) wins. Pace yourselves.', rarity: 'common', spice: 'cheeky', time: 'full', budget: 'splurge', minLads: 3, tags: ['pub','drinking'] },
    { id: 'c2', title: 'Accent Ambush', desc: 'Each lad commits to a fake accent for an hour in town. Break character, buy a round.', rarity: 'common', spice: 'cheeky', time: 'quick', budget: 'cheap', minLads: 2, tags: ['social','funny'] },
    { id: 'c3', title: 'The Â£20 Feast', desc: 'Â£20 total for the whole group. Feed everyone a proper meal. Cunning encouraged.', rarity: 'common', spice: 'cheeky', time: 'half', budget: 'cheap', minLads: 3, tags: ['food','challenge'] },
    { id: 'c4', title: 'Karaoke or Forfeit', desc: 'Every lad performs one song in public. Bottle it and the forfeit is yours.', rarity: 'rare', spice: 'cheeky', time: 'half', budget: 'cheap', minLads: 2, tags: ['social','brave'] },
    { id: 'c5', title: 'Stranger Selfie Bingo', desc: 'Bingo card of strangers (e.g. someone in a hat). Politely get a selfie with each. First to a line wins.', rarity: 'rare', spice: 'cheeky', time: 'half', budget: 'free', minLads: 3, tags: ['social','funny'] },
    { id: 'c6', title: 'Quiz Night Crashers', desc: 'Walk into a pub quiz with a daft team name. Last place buys, first place gloats.', rarity: 'common', spice: 'cheeky', time: 'half', budget: 'cheap', minLads: 3, tags: ['pub','competitive'] },
    { id: 'c7', title: 'Bookies Â£5 Parlay', desc: 'Â£5 each into one accumulator. Pick legs by committee. Winnings buy the night out.', rarity: 'rare', spice: 'cheeky', time: 'quick', budget: 'cheap', minLads: 3, tags: ['gamble','pub'] },
    { id: 'c8', title: 'Dress Code: Chaos', desc: 'Spin a theme (e.g. "beach in winter"). All lads dress to it for the whole day out.', rarity: 'common', spice: 'cheeky', time: 'full', budget: 'cheap', minLads: 3, tags: ['funny','town'] },
    { id: 'c9', title: 'Open Mic Open Goal', desc: 'Find an open mic. One lad must perform. Vote who by rock-paper-scissors.', rarity: 'legendary', spice: 'cheeky', time: 'half', budget: 'cheap', minLads: 3, tags: ['brave','social'] },
    { id: 'c10', title: 'The Compliment Gauntlet', desc: 'Give 10 genuine compliments to strangers each. Funniest reaction wins the round.', rarity: 'common', spice: 'cheeky', time: 'quick', budget: 'free', minLads: 2, tags: ['social','wholesome'] },
    { id: 'c11', title: 'Curry House Roulette', desc: 'Everyone orders for the lad on their left. No vetoes. Eat what you are given.', rarity: 'rare', spice: 'cheeky', time: 'half', budget: 'splurge', minLads: 4, tags: ['food','dare'] },
    { id: 'c12', title: 'Busk for a Pint', desc: 'No instruments? Improvise. Earn enough on the street to buy one shared pint.', rarity: 'legendary', spice: 'cheeky', time: 'half', budget: 'free', minLads: 2, tags: ['brave','funny'] },

    // ---------------- FULL SEND ----------------
    { id: 'f1', title: 'Coin Flip Road Trip', desc: 'At every junction, flip a coin: heads left, tails right. Drive 90 mins. Make a day of wherever it dumps you.', rarity: 'rare', spice: 'fullsend', time: 'full', budget: 'splurge', minLads: 2, tags: ['adventure','random'] },
    { id: 'f2', title: 'Â£0 to Hero', desc: 'Leave with no money. Barter, busk, and blag your way to a meal and a story by sundown.', rarity: 'legendary', spice: 'fullsend', time: 'full', budget: 'free', minLads: 2, tags: ['challenge','brave'] },
    { id: 'f3', title: 'The 5am Club', desc: 'Be doing something genuinely unhinged-but-legal at 5am. Sunrise rave in a car park counts.', rarity: 'rare', spice: 'fullsend', time: 'quick', budget: 'free', minLads: 3, tags: ['early','chaos'] },
    { id: 'f4', title: 'Furthest Postcode', desc: 'Whoever travels furthest from the start point on Â£15 by 6pm wins. Trains, thumbs, anything.', rarity: 'legendary', spice: 'fullsend', time: 'full', budget: 'cheap', minLads: 2, tags: ['adventure','competitive'] },
    { id: 'f5', title: 'Tattoo Lottery (Temp)', desc: 'Each lad draws a temporary tattoo design for the lad on their right. Apply it. Wear it proud.', rarity: 'common', spice: 'fullsend', time: 'quick', budget: 'cheap', minLads: 3, tags: ['dare','funny'] },
    { id: 'f6', title: 'Sell a Stranger a Dream', desc: 'Set up a stall selling absolute nonsense. First to make one real sale wins eternal glory.', rarity: 'legendary', spice: 'fullsend', time: 'half', budget: 'cheap', minLads: 3, tags: ['brave','funny'] },
    { id: 'f7', title: 'The Eating Trial', desc: 'Order the spiciest thing on a menu. Whole group. No milk. Last one talking wins.', rarity: 'rare', spice: 'fullsend', time: 'quick', budget: 'splurge', minLads: 3, tags: ['food','dare'] },
    { id: 'f8', title: 'Cold Open Comedy', desc: 'Each lad must make a full bus/train carriage laugh out loud once. Wholesome only. Big swing.', rarity: 'legendary', spice: 'fullsend', time: 'quick', budget: 'free', minLads: 2, tags: ['brave','social'] },
    { id: 'f9', title: 'The Golden Ticket', desc: 'MYTHIC ROLL. Pool Â£40 each, drive to the coast, and do the single most spontaneous thing you can all agree on. No plan survives.', rarity: 'mythic', spice: 'fullsend', time: 'full', budget: 'splurge', minLads: 2, tags: ['legendary','adventure'] },
    { id: 'f10', title: 'Skydive Fund Vote', desc: 'MYTHIC ROLL. Everyone books the most adrenaline thing within budget right now — go-karts, climbing, the lot. No backing out.', rarity: 'mythic', spice: 'fullsend', time: 'full', budget: 'splurge', minLads: 2, tags: ['legendary','brave'] },
    { id: 'f11', title: 'Strangers Become Mates', desc: 'Get invited to something by someone you have never met before the day is out. Report back.', rarity: 'mythic', spice: 'fullsend', time: 'full', budget: 'cheap', minLads: 2, tags: ['legendary','social'] },
  ],

  forfeits: [
    'Buys the next round, no debate.',
    'Wears their jumper inside out for the next hour.',
    'Texts their group chat "I have made a huge mistake" — no context given.',
    'Does the washing up after the whole day.',
    'Posts the worst photo of themselves on their story.',
    'Speaks only in questions for 20 minutes.',
    'Carries everyone’s bags to the next stop.',
    'Has to ask a stranger to settle a daft argument.',
    'Loses phone privileges for 30 minutes.',
    'Pays for the first taxi home.',
    'Must compliment the next 3 people you pass.',
    'Drinks/orders whatever the group picks for them next.',
    'Sings the chorus of a song chosen by the lad to their left.',
    'Is the designated photographer for the rest of the day.',
    'Owes everyone a bacon sandwich tomorrow morning.',
  ],
};
