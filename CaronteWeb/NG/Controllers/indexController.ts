﻿module Caronte {
	export interface ICaronteBaseScope extends angular.IScope {
		logged: boolean;
		citOfDay: string;
		loginObj: any;
		clearForm: Function;
		submittami: Function;
	}

	export class indexController {
		static $inject = ["$scope", "minosseService"];
		scope: ICaronteBaseScope;
		service: any;
		quoteList: string[];

		constructor(private $scope: ICaronteBaseScope, miNos: any) {
			this.scope = $scope;
			this.service = miNos;
			this.scope.logged = miNos.authentication();
			this.initCitazioni();
			this.scope.citOfDay = this.quoteList[Math.floor(Math.random() * this.quoteList.length)];

			this.clearForm();
			this.initBindMetodi();
			console.log(this.scope.logged);
		}

		//#region Inizializzazione

		private initCitazioni() {
			this.quoteList = ["I'm here to tell you uh, that one girl that has gotten attention for some reason, um is actually, a giant um, well how we say uh, B with an itch, huh! -Svetlana, Wassupp",
				"Mahybee, mahybeee not. Who nahws, thahts the funnn. -Catie, Things are about to get intense.",
				"I don't really know Tiago Costa so you know, don't kill me, please Tiago, if you, like, you know... want to, please don't. Cause I love you. You just don't know it yet. -Boxxy, FOAR ANT FRUM BOXXY",
				"I am Boxxy, you see? -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"You peoples were all like, 'YOU IS TROLLIN!' and I was like 'I AM NOT TROLLING!! I AM BOXXY! YOU SEE! Mm!' -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"He also has a penis, which is why he has a girlfriend. HUAH! -Boxxy, FOAR ANT FRUM BOXXY ",
				"Ok hi, my name is Boxxy. Most of you, most of you know me as Boxxy, but a lot of people don't know me as.. MOLDYlunchboxx. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"I'll tell you what's so serious business about car mirrors: they're from the devil, OK? -Catie, the truth about vanity car mirrors",
				"HOLY SHIT! I look like an Oompa Loompa! -Catie, the truth about vanity car mirrors",
				"..and only 8 pathetic little boys! -Catie, silly face challenge accepted.",
				"I'm pretty sure that if you have a working brain, you probably thought that that was amazing! -Boxxy, FOAR LITTLE KINKY FRUM BOXXY",
				"Most of you will be thinking, 'Well that's just provocative.' Well it's not, so you, you just knock that off mister. -Boxxy, FOAR LITTLE KINKY FRUM BOXXY",
				"This is just getting too seductive for my own good. -Boxxy, FOAR LITTLE KINKY FRUM BOXXY",
				"Boxxy's a, you know Boxxy's her own person, she's a character. She's not me because I'm Catie, I'm not Boxxy. -Catie, Calm down, Holden.",
				"There's lot's of videos a-coming. I kinda have to now, it's like a rule or something. -Catie, Things are about to get intense.",
				"I wouldn't um, say uh that word uh, to someone that who is homosex because that's not nice. -Boxxy, FOAR SVETLANA FRUM BOXXY",
				"If we'd had that class together, I would've remembered you because I LOVE YOUR HAIR [squeals]! -Boxxy, FOAR SVETLANA FRUM BOXXY",
				"Your hair is so long and it's not as waaaaah. -Boxxy, FOAR SVETLANA FRUM BOXXY",
				"So, what the plan was...was that...um, like, I was gonna make like, a Merry Christmas Boxxy video um, on, Christmas Eve. And this horrible, awful, terrible.... THING. Happened to me. -Catie, Things are about to get intense.",
				"I'm not FEELING, you know, the ESSENCE of Boxxy... -Catie, Things are about to get intense.",
				"There's a new video a comin'. I think you guys are really gonna like it! -Catie, Things are about to get intense.",
				"Give me the camera. Give me the camera... I'm gonna hit you. -Catie, :D",
				"If you can't take my word on it then you're dumb. -Boxxy, FOAR ANT FRUM BOXXY",
				"I don't do drugs... mm mmh! No, I know that you all think that I do drugs, but, I don't, actually. And I actually don't have ADD either. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"I held up a sign and it said 'Boxxy plus Pocky equals LOVE,' and that's true, it's a very true statement, I love her. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"It's one where I like have a sign and I'm like 'ihh' and it says several different things such as like I love mmm-chan, and stuff and umm it actually never said that, it said I love uh, Moochan, which is one of my old Gaia buddies. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"Oh, by the way, I'm not a Gaiafag anymore, I moved on to bigger and better things. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"Trolls! Trolls, this is my only account and um, and and it's boxxybabee with two e's. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"Other people, like um like boxxyakamoldybread — she's a failure Troll! TRAWLL! -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"I can't believe you guys believe that! Who actually talks like that?! Not ME! -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"Have you ever seen that movie? It's like AMAZING, it's like BEATLES.  -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"I just wanted to say to that kid who wanted to watch Across the Universe with me, uh that I love you, and I want to hold your hand. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"Brandon, I guess, I don't even know who you are, exactly. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"My hair got longer, you guys. I'm actually thinking about cutting it... I dunno. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"This one kid, uh he remixed all a lot of my videos, and they were so cool, and his name was GastricPenguin... -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"He was SO funny. He like mixed it and stuff, ahehe, and I was like 'ohhho' the first time I saw it. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"Oh my god I had a heart attack, I was like oh my god. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"Uh Steve. Steve, the guy who sat for like six minutes straight addressing me in a serious tone? Uh, thank you, I suppose. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"I don't think I should answer. Because, what- what if I told you, it would ruin the mystique, you guys? -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"And I'm like urr hurrhurr, and um and now I'm just like mascara and like I'm good to go. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"I stopped wearing it, because it's a really big pain the butt to apply every single morning. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"IIIII love you guys, a lot. Like really like, like, like, rawrawrawrawr status, like seriously like rah. -Boxxy, FOAR EVERYWUN FRUM BOXXY",
				"Most of you know me as um oom ugh well most of you know me as Boxxy I suppose. -Boxxy, FOAR 4DD1 FRUM BOXXY",
				"If you're watching this you probably know me as Boxxy, but um ugh ugh a lot of people don't know me as M o l d yLunchboxx.  -Boxxy, FOAR 4DD1 FRUM BOXXY",
				"I don't normally talk like this, I'm normally like all over the place like I am right now, but its a calmer voice most of the time unless I'm like really hyped up cuz then its different even still from this. -Boxxy, FOAR 4DD1 FRUM BOXXY",
				"I made a sign for him, and it was on my boob, my upper boob, and ugh his heart made a red mark cuz I had to keep erasing it. -Boxxy, FOAR 4DD1 FRUM BOXXY",
				"I dont know how to thank him because im so poor, Ive never had like 100K in my lifes. -Boxxy, FOAR 4DD1 FRUM BOXXY",
				"'cause I'm a dumb gaian and stuff. -Boxxy, FOAR 4DD1 FRUM BOXXY",
				"I wear too much eyeliner FYI Addie in case you couldn't tell already but thats ok. -Boxxy, FOAR 4DD1 FRUM BOXXY",
				"I dont know what you look like! And yet here you, you know what I sound like, you are a bastarrrrrrrrrd, YOUUUUUUUUU! I'm going to have to ask you for a picture. -Boxxy, FOAR 4DD1 FRUM BOXXY",
				"Very rude indeed! I don't appreciate it, my hair shaking everywhere. -Boxxy, FOAR 4DD1 FRUM BOXXY",
				"Now you know no one would find this funny except for a couple other people I don't think, so thats ok. -Boxxy, FOAR 4DD1 FRUM BOXXY",
				"I'm Greek, dude! I know, it freaked me out too. -Catie, RE: An Amble in Powell Park",
				"So I'm Greek, and that means I can climb fences really fast too. -Catie, RE: An Amble in Powell Park",
				"It's gonna be fun and great. And uh, it's pretty bad-ass too. So uh, this calls for a hat. -Catie, RE: An Amble in Powell Park",
				"Okay, so um, I can't climb uh, them that fast, even though I'm Greek. -Catie, RE: An Amble in Powell Park",
				"I magically opened the door. It was closed, like that. And I – BAM – like tried to climb it and it opened. -Catie, RE: An Amble in Powell Park",
				"I'm fuckin' magic, dude. I don't care what you say. -Catie, RE: An Amble in Powell Park",
				"So i don't know about you guys, but when i get sick it's like i revert to being four years old. -Catie, lifestyles of the sick and semifamous.",
				"Everyone just be fliffin' nice! -Boxxy, FOAR BOIS FRUM BOXXY",
				"Laughter is like, the best thing ever. It's so fun and it makes you feel good and tingly in your insides and it's just nice. -Boxxy, FOAR BOIS FRUM BOXXY",
				"But...but it's just that English. Yeah precisely you like English, you're like good at that shit. -Catie, lifestyles of the sick and semifamous",
				"What the fuck? What the fuck is this? What is that? Is that a p- it's a feather? What the fuck is a feather doing in my hair?' -Catie, lots and lots of bloopers!",
				"Who's the fucking joker sendin' in the Inuyasha pics hm? HMM? Fuckin' anime. -Catie, silly face challenge accepted.",
				"Mom! 'What?' Can I please have a pancake? -Catie (and her Mom), silly face challenge accepted.",
				"The hardest part of these videos for me is the beginning and the end because....yeah -Catie, silly face challenge accepted.",
				"There's nothing you can do about it. Nothing. Nootthhiiing. -Boxxy, FOAR EVERYPONY FRUM BOXXY",
				"Why would we have a respectable career when we could just make millions of dollars doing a porn? -Catie, Q+A: BFF edition (part three, the third and final installment)",
				"I remember the time that i first discovered make-up and I brought over the like whitest make-up I could and I was like 'Priyanka this is gonna work'. -Catie, Q+A: BFF edition (part three, the third and final installment)",
				"Well maybe you shouldn't be eating  McDonalds in the first place. 'Yeah! Mau5!' Yeah...Mau5. -Priyanka (and Catie), Q+A: BFF edition (part three, the third and final installment)"];
		}

		private initBindMetodi() {
			this.scope.clearForm = () => this.clearForm();
			this.scope.submittami = () => this.submittami();
		}

		//#endregion

		private clearForm() {
			this.scope.loginObj = {};
			this.scope.loginObj.userName = "";
			this.scope.loginObj.password = "";
		}

		private submittami() {
			console.log(this.scope.loginObj)
			this.service.login({ "userName": this.scope.loginObj.userName, "password": this.scope.loginObj.password },
				() => {
					location.href = "/";
					},
				() => {
					(<any>$).Notify({
						caption: 'Login',
						icon: 'mif-not',
						content: 'Dati di login errati! ',
						type: 'alert'
					})
				});
			//
		}
	}
}