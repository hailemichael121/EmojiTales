import { useState } from "react";
import axios from "axios";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const emojiStories = {
  "😊": {
    title1: "The Smiling Sun",
    body1:
      "In a sunny meadow, a cheerful sunflower named Sunny always smiled, spreading warmth and joy to everyone around. Her smile was so bright that it made the whole meadow glow with happiness. 🌻",
  },
  "😀": {
    title1: "The Joyful Journey",
    body1:
      "In a bustling city, a boy named Max had a smile that could light up the darkest streets. His positivity inspired everyone he met, turning the city into a place of joy and laughter. 🌆",
  },
  "😃": {
    title1: "The Grinning Star",
    body1:
      "In a galaxy far away, a star named Stella grinned so brightly that her light reached every corner of the universe. Her joy brought hope to planets and moons alike. 🌟",
  },
  "😄": {
    title1: "The Happy Hero",
    body1:
      "In a small village, a hero named Hugo saved the day with his infectious laughter. His joy was so powerful that it defeated even the gloomiest of monsters. 🦸‍♂️",
  },
  "😁": {
    title1: "The Beaming Baker",
    body1:
      "In a cozy bakery, a baker named Bella baked the happiest cakes in town. Her secret ingredient? A big, beaming smile that made every bite taste like joy. 🍰",
  },
  "😆": {
    title1: "The Laughing Lighthouse",
    body1:
      "On a rocky shore, a lighthouse named Lila laughed so loudly that her sound guided ships safely to the harbor. Her laughter was the brightest light of all. 🚢",
  },
  "😅": {
    title1: "The Sweaty Smile",
    body1:
      "In a hot desert, a camel named Carl kept smiling through the heat. His positive attitude helped his caravan find an oasis, where they celebrated with cool water and laughter. 🐪",
  },
  "🤣": {
    title1: "The Rolling Laughter",
    body1:
      "In a circus, a clown named Chuck made everyone laugh so hard that they rolled on the floor. His jokes were so funny that even the animals joined in the laughter. 🎪",
  },
  "😉": {
    title1: "The Winking Wizard",
    body1:
      "In a magical forest, a wizard named Wally winked and cast spells of joy. His playful tricks brought smiles to the faces of all the forest creatures. 🧙‍♂️",
  },
  "😜": {
    title1: "The Silly Sprite",
    body1:
      "In a sparkling stream, a water sprite named Lulu loved to play pranks. Her silly antics made everyone laugh, turning the stream into a place of endless fun. 💧",
  },
  "😝": {
    title1: "The Tongue-Tied Trickster",
    body1:
      "In a playful meadow, a rabbit named Ruby stuck out her tongue and made everyone giggle. Her funny faces brought joy to the meadow, making it the happiest place around. 🐰",
  },
  "😋": {
    title1: "The Yummy Yarn",
    body1:
      "In a candy-filled land, a cat named Candy loved to eat sweets. Her love for treats inspired the townsfolk to create the most delicious desserts, spreading joy with every bite. 🍬",
  },
  "😛": {
    title1: "The Playful Pup",
    body1:
      "In a sunny park, a puppy named Pippin stuck out his tongue and wagged his tail. His playful energy made everyone smile, turning the park into a place of happiness. 🐶",
  },
  "🤑": {
    title1: "The Money Maven",
    body1:
      "In a bustling market, a merchant named Mona loved to count her coins. Her wealth brought prosperity to the town, and her smile made everyone feel rich in spirit. 💰",
  },
  "🤗": {
    title1: "The Hugging Heart",
    body1:
      "In a peaceful village, a girl named Hannah loved to give hugs. Her warm embraces made everyone feel loved and cherished, spreading kindness throughout the village. 🤗",
  },
  "🤭": {
    title1: "The Secret Smile",
    body1:
      "In a quiet library, a librarian named Lily had a secret smile that brightened everyone's day. Her quiet joy inspired the townsfolk to share their own smiles. 📚",
  },
  "🤫": {
    title1: "The Whispering Wind",
    body1:
      "In a serene valley, the wind carried whispers of joy. A girl named Mia listened closely and shared the secrets of happiness with everyone she met. 🌬️",
  },
  "🤔": {
    title1: "The Curious Thinker",
    body1:
      "In a bustling town, a thinker named Theo pondered life's mysteries. His curiosity inspired others to ask questions and seek answers, making the town a place of learning and growth. 🤔",
  },
  "😐": {
    title1: "The Neutral Navigator",
    body1:
      "In a calm sea, a sailor named Sam kept a steady course. His calm demeanor helped his crew navigate through storms, bringing them safely to their destination. ⛵",
  },
  "😑": {
    title1: "The Stoic Sage",
    body1:
      "In a quiet monastery, a sage named Sora meditated in silence. His calm presence brought peace to the monks, teaching them the value of stillness. 🧘‍♂️",
  },
  "😶": {
    title1: "The Silent Storyteller",
    body1:
      "In a storytelling village, a mute boy named Milo told tales through his expressions. His silent stories captivated everyone, proving that words aren't always necessary. 📖",
  },
  "😏": {
    title1: "The Smirking Spy",
    body1:
      "In a secret agency, a spy named Sophia used her sly smile to outwit her enemies. Her cleverness and confidence made her the best in the business. 🕵️‍♀️",
  },
  "😒": {
    title1: "The Unimpressed Unicorn",
    body1:
      "In a magical forest, a unicorn named Uma was hard to impress. Her discerning nature inspired others to strive for excellence, making the forest a place of wonder. 🦄",
  },
  "🙄": {
    title1: "The Eye-Rolling Enigma",
    body1:
      "In a quirky town, a girl named Ella rolled her eyes at every silly thing. Her sarcastic humor brought laughter to the town, making it a place of fun and wit. 😏",
  },
  "😬": {
    title1: "The Nervous Navigator",
    body1:
      "In a stormy sea, a sailor named Nate clenched his teeth and steered his ship to safety. His bravery inspired his crew to face their fears and conquer the waves. 🌊",
  },
  "🤥": {
    title1: "The Fibbing Fox",
    body1:
      "In a dense forest, a fox named Felix loved to tell tall tales. His stories were so entertaining that even the truth couldn't compete with his imagination. 🦊",
  },
  "😌": {
    title1: "The Contented Cloud",
    body1:
      "In a peaceful sky, a cloud named Clara floated happily. Her calm presence brought serenity to the world below, reminding everyone to take a moment to relax. ☁️",
  },
  "😔": {
    title1: "The Melancholy Moon",
    body1:
      "In a quiet night, the moon felt lonely. A kind star named Stella kept her company, reminding her that even in darkness, there is light. 🌙",
  },
  "😴": {
    title1: "The Sleepy Sloth",
    body1:
      "In a cozy forest, a sloth named Sam loved to nap. His peaceful snores lulled the forest to sleep, making it the most restful place on Earth. 🦥",
  },
  "🤤": {
    title1: "The Dreamy Diner",
    body1:
      "In a bustling diner, a chef named Charlie dreamed of creating the perfect dish. His passion for food inspired everyone to savor every bite. 🍔",
  },
  "😷": {
    title1: "The Masked Medic",
    body1:
      "In a busy hospital, a doctor named Daisy wore a mask and healed the sick. Her dedication and care brought hope to her patients, making the hospital a place of healing. 🏥",
  },
  "🤒": {
    title1: "The Feverish Friend",
    body1:
      "In a small town, a boy named Ben caught a cold. His friends brought him soup and kept him company, showing that kindness is the best medicine. 🍲",
  },
  "🤕": {
    title1: "The Bandaged Brave",
    body1:
      "In a rugged mountain, a climber named Alex got hurt but kept going. His determination inspired others to push through their own challenges. 🏔️",
  },
  "🤢": {
    title1: "The Green Guardian",
    body1:
      "In a lush jungle, a frog named Fred felt queasy but still protected his home. His bravery reminded everyone that even the smallest creatures can make a big difference. 🐸",
  },
  "🤮": {
    title1: "The Sickly Star",
    body1:
      "In a distant galaxy, a star named Sam felt unwell. His fellow stars rallied around him, proving that even in the vastness of space, friendship matters. 🌌",
  },
  "🤧": {
    title1: "The Sneezing Sprite",
    body1:
      "In a magical meadow, a sprite named Sneezy couldn't stop sneezing. His friends brought him tissues and tea, showing that even magical beings need care. 🧚‍♂️",
  },
  "🥵": {
    title1: "The Sweaty Sun",
    body1:
      "In a scorching desert, the sun blazed fiercely. A cactus named Carl provided shade and water, reminding everyone to stay cool and hydrated. 🌵",
  },
  "🥶": {
    title1: "The Frozen Friend",
    body1:
      "In a snowy tundra, a penguin named Penny shivered in the cold. Her friends huddled together, proving that warmth comes from friendship. 🐧",
  },
  "🥴": {
    title1: "The Dizzy Dancer",
    body1:
      "In a lively dance hall, a dancer named Daisy spun until she felt dizzy. Her friends caught her and laughed, making the dance floor a place of joy. 💃",
  },
  "😵": {
    title1: "The Spinning Star",
    body1:
      "In a cosmic dance, a star named Stella spun so fast that she felt dizzy. Her fellow stars steadied her, showing that even in the vastness of space, friends are there to help. 🌟",
  },
  "🤯": {
    title1: "The Mind-Blowing Meteor",
    body1:
      "In a fiery sky, a meteor named Max exploded with ideas. His brilliance inspired the stars to shine brighter, lighting up the universe. 🌠",
  },
  "🤠": {
    title1: "The Cowboy Comet",
    body1:
      "In a wild galaxy, a comet named Cody rode through the stars like a cowboy. His adventurous spirit inspired others to explore the unknown. 🌌",
  },
  "🥳": {
    title1: "The Party Planet",
    body1:
      "In a festive solar system, a planet named Party Pete threw the biggest celebrations. His joy spread across the galaxy, making every day a reason to celebrate. 🎉",
  },
  "😎": {
    title1: "The Cool Cat",
    body1:
      "In a city of style, a cat named Slick wore the coolest shades. Everyone admired his swagger, but he was lonely. One day, he met a dog named Dash who showed him that true friendship is the coolest thing of all. 🐾",
  },
  "🤓": {
    title1: "The Nerdy Nebula",
    body1:
      "In a galaxy of knowledge, a nebula named Nora loved to read. Her wisdom inspired the stars to learn and grow, making the universe a brighter place. 📚",
  },
  "🧐": {
    title1: "The Curious Comet",
    body1:
      "In a cosmic library, a comet named Carl studied the mysteries of the universe. His curiosity inspired others to seek answers, making the galaxy a place of discovery. 🌌",
  },
  "😕": {
    title1: "The Confused Cloud",
    body1:
      "In a cloudy sky, a cloud named Clara felt lost. A kind rainbow named Roy guided her, showing that even in confusion, there is beauty. 🌈",
  },
  "😟": {
    title1: "The Worried Wind",
    body1:
      "In a stormy sky, the wind felt anxious. A calm breeze named Bella soothed it, reminding everyone that even in chaos, peace can be found. 🌬️",
  },
  "🙁": {
    title1: "The Sad Star",
    body1:
      "In a dark night, a star named Stella felt lonely. Her fellow stars gathered around her, proving that even in darkness, there is light. 🌟",
  },
  "😮": {
    title1: "The Surprised Sun",
    body1:
      "In a sunny sky, the sun was shocked by a sudden eclipse. The moon explained the phenomenon, teaching everyone about the wonders of the universe. 🌞",
  },
  "😯": {
    title1: "The Astonished Asteroid",
    body1:
      "In a cosmic collision, an asteroid named Alex was amazed by the beauty of the stars. His wonder inspired others to appreciate the universe. 🌠",
  },
  "😲": {
    title1: "The Shocked Satellite",
    body1:
      "In a high-tech space station, a satellite named Sam was surprised by a meteor shower. His excitement inspired the crew to explore the stars. 🛰️",
  },
  "😳": {
    title1: "The Blushing Comet",
    body1:
      "In a fiery sky, a comet named Clara blushed as she passed by the sun. Her shyness reminded everyone that even celestial bodies have feelings. 🌠",
  },
  "🥺": {
    title1: "The Tearful Moon",
    body1:
      "In a quiet night, the moon cried tears of stardust. A kind star named Stella comforted her, reminding her that even in sadness, there is beauty. 🌙",
  },
  "😦": {
    title1: "The Frowning Forest",
    body1:
      "In a gloomy forest, the trees felt sad. A cheerful bird named Bella sang a song, lifting their spirits and bringing joy to the forest. 🌳",
  },
  "😧": {
    title1: "The Distressed Desert",
    body1:
      "In a dry desert, the sand felt parched. A kind cactus named Carl shared his water, reminding everyone that even in harsh conditions, kindness prevails. 🌵",
  },
  "😨": {
    title1: "The Scared Star",
    body1:
      "In a dark galaxy, a star named Stella felt afraid. Her fellow stars gathered around her, proving that even in darkness, there is light. 🌟",
  },
  "😰": {
    title1: "The Anxious Asteroid",
    body1:
      "In a cosmic storm, an asteroid named Alex felt nervous. A calm comet named Clara guided him, showing that even in chaos, there is peace. 🌠",
  },
  "😥": {
    title1: "The Tearful Tree",
    body1:
      "In a quiet forest, a tree named Timmy cried tears of sap. A kind bird named Bella comforted him, reminding him that even in sadness, there is hope. 🌳",
  },
  "😢": {
    title1: "The Tearful Tale",
    body1:
      "In a village where tears turned into pearls, a sad girl named Lily cried a river of gems. Her tears brought wealth to the village, but she longed for happiness. One day, a kind traveler taught her to smile, and her tears turned into laughter. 🌟",
  },
  "😭": {
    title1: "The Weeping Willow",
    body1:
      "In a peaceful meadow, a willow tree named Wendy wept softly. Her tears nourished the soil, bringing life to the meadow and reminding everyone that even sadness can bring growth. 🌿",
  },
  "😱": {
    title1: "The Terrified Comet",
    body1:
      "In a fiery sky, a comet named Clara screamed as she zoomed past the sun. Her bravery inspired others to face their fears, proving that even in terror, there is courage. 🌠",
  },
  "😖": {
    title1: "The Frustrated Forest",
    body1:
      "In a dense forest, the trees felt frustrated by the lack of rain. A kind cloud named Clara brought a gentle shower, reminding everyone that patience brings rewards. 🌧️",
  },
  "😣": {
    title1: "The Struggling Star",
    body1:
      "In a distant galaxy, a star named Stella struggled to shine. Her fellow stars encouraged her, proving that even in darkness, there is light. 🌟",
  },
  "😞": {
    title1: "The Disappointed Desert",
    body1:
      "In a dry desert, the sand felt disappointed by the lack of rain. A kind cactus named Carl shared his water, reminding everyone that even in harsh conditions, kindness prevails. 🌵",
  },
  "😓": {
    title1: "The Sweaty Sun",
    body1:
      "In a scorching desert, the sun blazed fiercely. A cactus named Carl provided shade and water, reminding everyone to stay cool and hydrated. 🌵",
  },
  "😩": {
    title1: "The Exhausted Earth",
    body1:
      "In a busy world, the Earth felt tired. A kind moon named Luna offered a moment of rest, reminding everyone to take a break and recharge. 🌍",
  },
  "😫": {
    title1: "The Tired Tree",
    body1:
      "In a quiet forest, a tree named Timmy felt exhausted. A kind bird named Bella sang a lullaby, helping him rest and reminding everyone that even nature needs a break. 🌳",
  },
  "🥱": {
    title1: "The Sleepy Star",
    body1:
      "In a quiet galaxy, a star named Stella yawned and dimmed her light. Her fellow stars gathered around her, proving that even in darkness, there is light. 🌟",
  },
  "😤": {
    title1: "The Determined Desert",
    body1:
      "In a dry desert, the sand felt determined to find water. A kind cactus named Carl shared his water, reminding everyone that even in harsh conditions, perseverance pays off. 🌵",
  },
  "😡": {
    title1: "The Angry Asteroid",
    body1:
      "In a fiery sky, an asteroid named Alex raged through the stars. A calm comet named Clara soothed him, showing that even in anger, there is peace. 🌠",
  },
  "😠": {
    title1: "The Furious Forest",
    body1:
      "In a dense forest, the trees felt furious about the lack of rain. A kind cloud named Clara brought a gentle shower, reminding everyone that patience brings rewards. 🌧️",
  },
  "🤬": {
    title1: "The Cursing Comet",
    body1:
      "In a fiery sky, a comet named Clara cursed the stars. A kind meteor named Max calmed her, showing that even in anger, there is peace. 🌠",
  },
  "😈": {
    title1: "The Mischievous Moon",
    body1:
      "In a dark night, the moon played tricks on the stars. A kind sun named Sam scolded her, reminding everyone that even mischief has its limits. 🌙",
  },
  "👿": {
    title1: "The Devilish Desert",
    body1:
      "In a dry desert, the sand felt devilish. A kind cactus named Carl shared his water, reminding everyone that even in harsh conditions, kindness prevails. 🌵",
  },
  "💀": {
    title1: "The Skeleton's Secret",
    body1:
      "In a spooky graveyard, a skeleton named Sam had a secret. His bones rattled with laughter as he told ghost stories, making the graveyard a place of fun and frights. 💀",
  },
  "☠️": {
    title1: "The Pirate's Parrot",
    body1:
      "In a pirate ship, a parrot named Polly squawked tales of treasure. Her stories inspired the crew to sail the seven seas, making the ocean a place of adventure. 🏴‍☠️",
  },
  "💩": {
    title1: "The Poo's Party",
    body1:
      "In a silly world, a pile of poo named Pete threw the funniest parties. His laughter was contagious, making everyone forget their worries and enjoy the moment. 💩",
  },
  "🤡": {
    title1: "The Clown's Carnival",
    body1:
      "In a colorful carnival, a clown named Chuck made everyone laugh. His jokes and tricks turned the carnival into a place of endless fun. 🎪",
  },
  "👻": {
    title1: "The Friendly Ghost",
    body1:
      "In a haunted mansion, a ghost named Casper wanted to make friends. He scared people away until he met a brave girl who saw his kind heart. Together, they turned the mansion into a place of joy and laughter. 👻",
  },
  "👽": {
    title1: "The Alien Visitor",
    body1:
      "In a small town, an alien named Zog landed his spaceship. The townspeople were scared at first, but Zog's friendly nature won them over. He shared stories of distant galaxies and taught them that the universe is full of wonders. 🌌",
  },
  "🎃": {
    title1: "The Pumpkin King",
    body1:
      "In a spooky village, a pumpkin named Jack came to life on Halloween night. He became the Pumpkin King and led the villagers in a night of fun and frights. His laughter echoed through the night, making Halloween unforgettable. 🎃",
  },
  "😺": {
    title1: "The Smiling Cat",
    body1:
      "In a cozy home, a cat named Cleo smiled at her owner. Her purrs and cuddles brought warmth and joy, making the home a place of love and happiness. 🐱",
  },
  "😸": {
    title1: "The Grinning Cat",
    body1:
      "In a sunny garden, a cat named Charlie grinned as he chased butterflies. His playful antics brought laughter to the garden, making it a place of endless fun. 🦋",
  },
  "😹": {
    title1: "The Laughing Cat",
    body1:
      "In a lively park, a cat named Chloe laughed at the silly squirrels. Her joy was contagious, turning the park into a place of happiness and laughter. 🐿️",
  },
  "😻": {
    title1: "The Adoring Cat",
    body1:
      "In a loving home, a cat named Coco adored her owner. Her affectionate purrs and cuddles made the home a place of warmth and love. 🐾",
  },
  "😼": {
    title1: "The Sly Cat",
    body1:
      "In a quiet alley, a cat named Cleo had a sly grin. Her clever tricks and playful nature made the alley a place of fun and mischief. 🐈",
  },
  "😽": {
    title1: "The Kissing Cat",
    body1:
      "In a cozy home, a cat named Charlie gave kisses to his owner. His affectionate nature made the home a place of love and warmth. 💋",
  },
  "🙀": {
    title1: "The Shocked Cat",
    body1:
      "In a quiet home, a cat named Cleo was shocked by a loud noise. Her wide eyes and playful antics made the home a place of laughter and fun. 😲",
  },
  "😿": {
    title1: "The Crying Cat",
    body1:
      "In a peaceful home, a cat named Chloe cried softly. Her owner comforted her, reminding her that even in sadness, there is love. 🐱",
  },
  "😾": {
    title1: "The Angry Cat",
    body1:
      "In a quiet home, a cat named Charlie felt angry. His owner soothed him, showing that even in frustration, there is peace. 🐾",
  },
  "🙈": {
    title1: "The Shy Monkey",
    body1:
      "In a dense jungle, a monkey named Max covered his eyes. His shyness reminded everyone that even in the wild, there is vulnerability. 🐒",
  },
  "🙉": {
    title1: "The Deaf Monkey",
    body1:
      "In a noisy jungle, a monkey named Mia covered her ears. Her quiet nature reminded everyone that even in chaos, there is peace. 🐵",
  },
  "🙊": {
    title1: "The Silent Monkey",
    body1:
      "In a quiet jungle, a monkey named Milo covered his mouth. His silence reminded everyone that sometimes, words aren't necessary. 🐒",
  },
  "💋": {
    title1: "The Kissing Cloud",
    body1:
      "In a sunny sky, a cloud named Clara blew kisses to the world below. Her love spread across the land, reminding everyone to share kindness. ☁️",
  },
  "💌": {
    title1: "The Love Letter",
    body1:
      "In a quiet town, a letter named Lily carried a message of love. Her words brought joy to the recipient, reminding everyone of the power of love. 💌",
  },
  "💘": {
    title1: "The Heart's Arrow",
    body1:
      "In a magical forest, an arrow named Alex pierced a heart. His love spread through the forest, reminding everyone that love is the strongest magic. 🏹",
  },
  "💝": {
    title1: "The Gift of Love",
    body1:
      "In a festive town, a gift named Grace was wrapped with love. Her presence brought joy to the town, reminding everyone to cherish the ones they love. 🎁",
  },
  "💖": {
    title1: "The Sparkling Heart",
    body1:
      "In a starry sky, a heart named Stella sparkled brightly. Her light spread across the galaxy, reminding everyone that love is the brightest star. 🌟",
  },
  "💗": {
    title1: "The Growing Heart",
    body1:
      "In a peaceful meadow, a heart named Hugo grew bigger with every kind act. His love spread through the meadow, reminding everyone to be kind. 🌿",
  },
  "💓": {
    title1: "The Beating Heart",
    body1:
      "In a bustling city, a heart named Max beat with passion. His energy inspired the city, reminding everyone to follow their dreams. 🏙️",
  },
  "💞": {
    title1: "The Dancing Hearts",
    body1:
      "In a lively dance hall, two hearts named Lily and Leo danced together. Their love spread through the hall, reminding everyone to celebrate love. 💃",
  },
  "💕": {
    title1: "The Twin Hearts",
    body1:
      "In a magical forest, two hearts named Mia and Max beat as one. Their love spread through the forest, reminding everyone that love is the strongest magic. 🌳",
  },
  "💟": {
    title1: "The Heart's Symbol",
    body1:
      "In a peaceful town, a heart named Grace was a symbol of love. Her presence brought joy to the town, reminding everyone to cherish the ones they love. 💖",
  },
  "❣️": {
    title1: "The Bold Heart",
    body1:
      "In a bustling city, a heart named Max stood out with its boldness. His energy inspired the city, reminding everyone to follow their dreams. 🏙️",
  },
  "💔": {
    title1: "The Broken Heart",
    body1:
      "In a quiet town, a heart named Lily broke into pieces. Her friends gathered around her, reminding her that even in sadness, there is love. 💔",
  },
  "❤️": {
    title1: "The Red Heart",
    body1:
      "In a vibrant world, a heart named Ruby shone brightly. Her love spread across the land, reminding everyone to share kindness. ❤️",
  },
  "🧡": {
    title1: "The Orange Heart",
    body1:
      "In a sunny meadow, a heart named Oliver glowed with warmth. His love spread through the meadow, reminding everyone to be kind. 🌻",
  },
  "💛": {
    title1: "The Yellow Heart",
    body1:
      "In a bright garden, a heart named Lily sparkled with joy. Her love spread through the garden, reminding everyone to celebrate happiness. 🌼",
  },
  "💚": {
    title1: "The Green Heart",
    body1:
      "In a lush forest, a heart named Leo grew with every kind act. His love spread through the forest, reminding everyone to cherish nature. 🌳",
  },
  "💙": {
    title1: "The Blue Heart",
    body1:
      "In a calm ocean, a heart named Mia floated peacefully. Her love spread through the water, reminding everyone to find peace. 🌊",
  },
  "💜": {
    title1: "The Purple Heart",
    body1:
      "In a magical sky, a heart named Max glowed with mystery. His love spread across the galaxy, reminding everyone that love is the strongest magic. 🌌",
  },
  "🤎": {
    title1: "The Brown Heart",
    body1:
      "In a cozy home, a heart named Charlie brought warmth and comfort. His love spread through the home, reminding everyone to cherish their loved ones. 🏡",
  },
  "🖤": {
    title1: "The Black Heart",
    body1:
      "In a dark night, a heart named Stella shone brightly. Her love spread across the land, reminding everyone that even in darkness, there is light. 🌑",
  },
  "🤍": {
    title1: "The White Heart",
    body1:
      "In a peaceful meadow, a heart named Lily glowed with purity. Her love spread through the meadow, reminding everyone to be kind. 🌿",
  },
  "💯": {
    title1: "The Perfect Score",
    body1:
      "In a bustling school, a student named Max achieved a perfect score. His hard work inspired his classmates, reminding everyone to strive for excellence. 🎓",
  },
  "💢": {
    title1: "The Angry Symbol",
    body1:
      "In a fiery sky, a symbol named Alex raged through the stars. A calm comet named Clara soothed him, showing that even in anger, there is peace. 🌠",
  },
  "💥": {
    title1: "The Exploding Star",
    body1:
      "In a distant galaxy, a star named Stella exploded with energy. Her brilliance inspired the stars to shine brighter, lighting up the universe. 🌠",
  },
  "💫": {
    title1: "The Dizzy Star",
    body1:
      "In a cosmic dance, a star named Stella spun so fast that she felt dizzy. Her fellow stars steadied her, showing that even in the vastness of space, friends are there to help. 🌟",
  },
  "💦": {
    title1: "The Sweating Cloud",
    body1:
      "In a hot sky, a cloud named Clara sweated as she tried to bring rain. Her determination inspired the other clouds, reminding everyone to keep trying. 🌧️",
  },
  "💨": {
    title1: "The Swift Wind",
    body1:
      "In a stormy sky, the wind blew fiercely. A calm breeze named Bella soothed it, reminding everyone that even in chaos, peace can be found. 🌬️",
  },
  "🕳️": {
    title1: "The Mysterious Hole",
    body1:
      "In a quiet forest, a hole named Hugo appeared out of nowhere. His mystery inspired the animals to explore, reminding everyone that curiosity leads to discovery. 🌳",
  },
  "💣": {
    title1: "The Explosive Idea",
    body1:
      "In a bustling city, an idea named Max exploded with creativity. His brilliance inspired the city, reminding everyone to think outside the box. 💡",
  },
  "💬": {
    title1: "The Chatty Cloud",
    body1:
      "In a sunny sky, a cloud named Clara chatted with the stars. Her conversations brought joy to the sky, reminding everyone to share their thoughts. ☁️",
  },
  "🗨️": {
    title1: "The Talking Star",
    body1:
      "In a distant galaxy, a star named Stella shared stories with her fellow stars. Her words inspired the galaxy, reminding everyone to communicate. 🌟",
  },
  "🗯️": {
    title1: "The Angry Cloud",
    body1:
      "In a stormy sky, a cloud named Alex raged with thunder. A calm breeze named Bella soothed him, showing that even in anger, there is peace. 🌩️",
  },
  "💭": {
    title1: "The Dreamy Cloud",
    body1:
      "In a peaceful sky, a cloud named Clara dreamed of rainbows. Her dreams inspired the other clouds, reminding everyone to dream big. 🌈",
  },
  "💤": {
    title1: "The Sleeping Star",
    body1:
      "In a quiet galaxy, a star named Stella slept peacefully. Her rest inspired the other stars, reminding everyone to take a break. 🌟",
  },
  "👋": {
    title1: "The Waving Hand",
    body1:
      "In a bustling town, a hand named Max waved to everyone he met. His friendliness inspired the town, reminding everyone to be kind. 👋",
  },
  "🤚": {
    title1: "The Raised Hand",
    body1:
      "In a busy classroom, a hand named Mia raised questions. Her curiosity inspired her classmates, reminding everyone to seek answers. 🖐️",
  },
  "🖐️": {
    title1: "The Open Hand",
    body1:
      "In a peaceful meadow, a hand named Lily reached out to help. Her kindness inspired the meadow, reminding everyone to lend a hand. 🌿",
  },
  "✋": {
    title1: "The Stop Hand",
    body1:
      "In a busy street, a hand named Max stopped traffic. His bravery inspired the city, reminding everyone to stay safe. 🚦",
  },
  "🖖": {
    title1: "The Vulcan Salute",
    body1:
      "In a distant galaxy, a hand named Stella greeted her fellow stars. Her gesture inspired the galaxy, reminding everyone to live long and prosper. 🖖",
  },
  "👌": {
    title1: "The OK Hand",
    body1:
      "In a bustling city, a hand named Max gave a thumbs up. His positivity inspired the city, reminding everyone to stay optimistic. 👍",
  },
  "🦓": {
    title1: "The Zebra's Stripes",
    body1:
      "In the African plains, a zebra named Ziggy was proud of his unique stripes. When a drought hit, his stripes helped him blend in and find hidden water sources, saving his herd. 🦓",
  },
  "🦒": {
    title1: "The Giraffe's View",
    body1:
      "In the savannah, a giraffe named Gina loved her tall neck. She could see far and wide, spotting dangers and leading her friends to safety. Her height was a gift that protected her community. 🦒",
  },
  "🦔": {
    title1: "The Hedgehog's Defense",
    body1:
      "In a quiet meadow, a hedgehog named Harry used his spines to protect himself from predators. His bravery and cleverness made him a hero among the small creatures of the meadow. 🦔",
  },
  "🦜": {
    title1: "The Parrot's Colors",
    body1:
      "In a tropical rainforest, a parrot named Polly was known for her vibrant feathers. She spread joy with her colorful appearance and cheerful songs, making the forest a happier place. 🦜",
  },
  "🦢": {
    title1: "The Swan's Grace",
    body1:
      "In a serene lake, a swan named Serena was admired for her grace and beauty. Her elegant movements inspired the other animals to appreciate the beauty of nature. 🦢",
  },
  "🦩": {
    title1: "The Flamingo's Dance",
    body1:
      "In a sunny lagoon, a flamingo named Fiona loved to dance. Her graceful moves and pink feathers brought joy to all who watched, turning the lagoon into a place of celebration. 🦩",
  },
  "🦚": {
    title1: "The Peacock's Pride",
    body1:
      "In a royal garden, a peacock named Percy was proud of his magnificent tail. He used his beauty to attract friends and spread happiness, making the garden a magical place. 🦚",
  },
  "🦥": {
    title1: "The Sloth's Patience",
    body1:
      "In a lush jungle, a sloth named Sam was known for his slow and steady pace. His patience and calm nature taught the other animals the value of taking life one step at a time. 🦥",
  },
  "🦦": {
    title1: "The Otter's Play",
    body1:
      "In a flowing river, an otter named Ollie loved to play. His playful antics and joyful spirit brought laughter and fun to the riverbank, making every day an adventure. 🦦",
  },
  "🦨": {
    title1: "The Skunk's Scent",
    body1:
      "In a dense forest, a skunk named Stella used her unique scent to protect herself and her friends. Her bravery and resourcefulness made her a respected figure among the forest creatures. 🦨",
  },
  "😂": {
    title1: "The Laughing Kingdom",
    body1:
      "In a land where laughter was the most precious treasure, a young jester named Jolly discovered a magical joke book. With each joke he told, the kingdom grew happier, and the skies filled with rainbows. 🌈",
  },

  "😇": {
    title1: "The Angel's Gift",
    body1:
      "In a heavenly realm, an angel named Grace was sent to Earth with a special gift. She brought kindness and joy to everyone she met, and her presence made the world a better place. 🌍",
  },
  "🤖": {
    title1: "The Robot's Dream",
    body1:
      "In a futuristic city, a robot named Bolt dreamed of becoming human. He embarked on a journey to find a magical circuit that could grant his wish. Along the way, he discovered that emotions and friendships were the true essence of humanity. 🤖❤️",
  },
  "🦄": {
    title1: "The Unicorn's Quest",
    body1:
      "In an enchanted forest, a unicorn named Sparkle set out on a quest to find the legendary Rainbow Crystal. With the help of her friends, she overcame obstacles and discovered that the true magic was the bond they shared. 🌈",
  },

  "🐉": {
    title1: "The Dragon's Treasure",
    body1:
      "In a mountainous kingdom, a dragon named Blaze guarded a hidden treasure. A brave knight named Leo sought the treasure, but instead of fighting, they became friends. Together, they protected the kingdom and shared the treasure with the people. 🐉",
  },
  "🧙‍♂️": {
    title1: "The Wizard's Spell",
    body1:
      "In a mystical land, a wizard named Merlin cast a spell to protect his village from darkness. His magic brought light and hope to the people, and they celebrated his wisdom and bravery. ✨",
  },
  "🧜‍♀️": {
    title1: "The Mermaid's Song",
    body1:
      "In the depths of the ocean, a mermaid named Ariel sang a song that enchanted all who heard it. Her voice brought peace to the underwater kingdom, and she became a beloved figure among the sea creatures. 🌊",
  },

  "🦸‍♂️": {
    title1: "The Superhero's Secret",
    body1:
      "In a bustling city, a man named Max had a secret identity as a superhero. He saved the city from villains, but his true power was his kindness. His secret was revealed when he helped a child in need, and the city celebrated their true hero. 🦸‍♂️",
  },
  "🧚‍♀️": {
    title1: "The Fairy's Wish",
    body1:
      "In a magical forest, a fairy named Tinker granted wishes to those with pure hearts. One day, she met a boy who wished for his village to be happy. Tinker granted his wish, and the village flourished with joy and prosperity. 🧚‍♀️",
  },
  "🦁": {
    title1: "The Lion's Courage",
    body1:
      "In the savannah, a lion named Leo was known for his bravery. When a drought threatened the animals, Leo led them to a hidden oasis. His courage and leadership saved the day, and he became the king of the savannah. 🦁",
  },
  "🐢": {
    title1: "The Turtle's Journey",
    body1:
      "In a peaceful pond, a turtle named Shelly dreamed of seeing the ocean. She embarked on a long journey, facing many challenges. With determination and the help of new friends, she finally reached the ocean and found her true home. 🐢",
  },
  "🐧": {
    title1: "The Penguin's Adventure",
    body1:
      "In the icy Antarctic, a penguin named Pippin wanted to explore the world. He set off on an adventure, sliding on icebergs and swimming through the sea. Along the way, he discovered new lands and made friends with creatures from different places. 🐧",
  },
  "🦊": {
    title1: "The Fox's Clever Plan",
    body1:
      "In a dense forest, a fox named Fenn was known for his cleverness. When a fire threatened the forest, Fenn devised a plan to lead the animals to safety. His quick thinking saved many lives, and he became a hero among the forest creatures. 🦊",
  },
  "🐼": {
    title1: "The Panda's Peace",
    body1:
      "In a bamboo forest, a panda named Po lived a peaceful life. When conflict arose between the animals, Po used his wisdom and gentle nature to bring harmony. His efforts united the forest, and peace was restored. 🐼",
  },
  "🦋": {
    title1: "The Butterfly's Transformation",
    body1:
      "In a beautiful garden, a caterpillar named Bella dreamed of flying. She went through a magical transformation and emerged as a butterfly. Bella's journey inspired others to embrace change and find their true potential. 🦋",
  },
  "🐘": {
    title1: "The Elephant's Memory",
    body1:
      "In the vast savannah, an elephant named Ellie was known for her incredible memory. She remembered every path and waterhole, guiding her herd through tough times. Ellie's wisdom and memory kept her family safe and strong. 🐘",
  },
  "👾": {
    title1: "The Gamer's Challenge",
    body1:
      "In a digital world, a gamer named Alex was known for his skills. He faced a new challenge that seemed unbeatable. With determination and the help of his online friends, he conquered the game and became a legend. 🎮",
  },
  "🕹️": {
    title1: "The Arcade Adventure",
    body1:
      "In an old arcade, a group of friends discovered a magical game. As they played, they were transported into the game world, where they had to work together to overcome challenges and return home. 🕹️",
  },
  "👩‍🚀": {
    title1: "The Astronaut's Journey",
    body1:
      "In the vastness of space, an astronaut named Luna embarked on a mission to explore a distant planet. Along the way, she discovered new life forms and made groundbreaking discoveries that changed humanity's understanding of the universe. 🚀",
  },
  "👨‍🚀": {
    title1: "The Space Explorer",
    body1:
      "In a futuristic world, a space explorer named Orion set out on a journey to find a new habitable planet. His adventures led him to uncharted territories, where he encountered alien civilizations and formed alliances for the future of mankind. 🌌",
  },
  "👩‍⚕️": {
    title1: "The Doctor's Compassion",
    body1:
      "In a bustling city, a doctor named Emma dedicated her life to helping others. Her compassion and skill saved countless lives, and she became a beacon of hope and healing for her community. 🏥",
  },
  "👨‍⚕️": {
    title1: "The Healer's Touch",
    body1:
      "In a small village, a healer named John used his knowledge of herbs and medicine to cure the sick. His gentle touch and wisdom brought health and happiness to the villagers, making him a beloved figure. 🌿",
  },
  "👩‍🏫": {
    title1: "The Teacher's Wisdom",
    body1:
      "In a quaint town, a teacher named Sarah inspired her students with her passion for learning. Her wisdom and kindness shaped the minds of future leaders, leaving a lasting legacy. 📚",
  },
  "👨‍🏫": {
    title1: "The Mentor's Guidance",
    body1:
      "In a prestigious academy, a mentor named David guided his students with patience and insight. His teachings went beyond textbooks, instilling values and life lessons that stayed with them forever. 🎓",
  },
  "👩‍🎨": {
    title1: "The Artist's Vision",
    body1:
      "In a vibrant city, an artist named Mia painted murals that brought the streets to life. Her vision and creativity transformed the urban landscape, inspiring others to see the beauty in everyday moments. 🎨",
  },
  "👨‍🎨": {
    title1: "The Painter's Dream",
    body1:
      "In a quiet village, a painter named Leo dreamed of capturing the essence of nature on canvas. His masterpieces reflected the soul of the landscape, earning him admiration and respect from art lovers around the world. 🖌️",
  },
  "👩‍🚒": {
    title1: "The Firefighter's Bravery",
    body1:
      "In a bustling city, a firefighter named Anna risked her life to save others. Her bravery and dedication made her a hero, and her actions inspired the community to come together in times of crisis. 🚒",
  },
  "👨‍🚒": {
    title1: "The Rescuer's Courage",
    body1:
      "In a small town, a firefighter named Jack faced dangerous situations with unwavering courage. His quick thinking and selflessness saved many lives, earning him the gratitude and admiration of the townspeople. 🔥",
  },
  "👩‍✈️": {
    title1: "The Pilot's Adventure",
    body1:
      "In the skies above, a pilot named Amelia soared through the clouds, exploring new horizons. Her adventurous spirit and skillful flying took her to distant lands, where she experienced the wonders of the world from above. ✈️",
  },
};

const useOpenAIStoryGenerator = () => {
  const [storyData, setStoryData] = useState({
    title1: "",
    body1: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Generate story using GPT
  const generateWithGPT = async (prompt, retries = 3, backoff = 1000) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a creative story generator.",
            },
            {
              role: "user",
              content: `
                  Generate two short and creative fairy tales based on the following input:
                  "${prompt}"

                  Each story should include:
                  1. A title (short and catchy)
                  2. A body (3-4 sentences max)

                  Format your response as:
                  Title 1: <Story Title>
                  Body 1: <Story Body>

                  Title 2: <Story Title>
                  Body 2: <Story Body>
                `,
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const result = response.data.choices[0].message.content.trim();

      // Parse the result from the model's response
      const title1 = result.match(/Title 1:\s*(.+)/)?.[1] || "Untitled Story 1";
      const body1 =
        result.match(/Body 1:\s*(.+)/)?.[1] || "No body for Story 1.";
      const title2 = result.match(/Title 2:\s*(.+)/)?.[1] || "Untitled Story 2";
      const body2 =
        result.match(/Body 2:\s*(.+)/)?.[1] || "No body for Story 2.";

      return { title1, body1, title2, body2 };
    } catch (err) {
      if (err.response && err.response.status === 429 && retries > 0) {
        console.log(`Rate limit hit. Retrying in ${backoff}ms...`);
        await delay(backoff);
        return generateWithGPT(prompt, retries - 1, backoff * 2);
      }
      throw err;
    }
  };
  const generateWithDictionary = (prompt) => {
    // Extract the first emoji from the prompt
    const emoji = prompt.trim().match(/^[^\s\w]+/)?.[0]; // Match the first non-space, non-word character
    if (emojiStories[emoji]) {
      console.log("Using dictionary for emoji:", emoji);
      return emojiStories[emoji];
    }
    console.log("Unknown emoji:", emojiStories["${emoji}"]);
    return {
      title1: "Unknown Emoji",
      body1: "We don't have a story for this emoji yet. Try another one! 😊",
    };
  };

  const generateStories = async (prompt) => {
    setLoading(true);
    setError("");

    try {
      // Try GPT first
      const gptStory = await generateWithGPT(prompt);
      setStoryData(gptStory);
    } catch (gptError) {
      console.error("GPT Error:", gptError);

      const dictStory = generateWithDictionary(prompt);
      console.log("Falling back to dictionary:", dictStory);
      setStoryData(dictStory);
    } finally {
      setLoading(false);
    }
  };

  return {
    storyData,
    loading,
    error,
    generateStories,
  };
};

export default useOpenAIStoryGenerator;
