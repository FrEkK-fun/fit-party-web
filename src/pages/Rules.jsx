const Rules = () => {
	return (
		<main>
			<h2>Rules</h2>
			<div className="rulesRuleCard">
				<h3>Stjerner</h3>
				<p>
					Målet i spillet er å tjene stjerner. Disse kan skaffes på flere måter:
				</p>
				<ul>
					<li>
						<h4>Brett-stjerner</h4>
						<p>
							Brett-stjerner plukkes opp ved å lande på samme felt på brettet
							som en stjerne. Det er nesten alltid én stjerne på brettet, og
							etter de er plukket opp vil det neste dag/tur spawne en ny.
							Spillet vil kalkulere hvilket felt som ligger lengst unna alle
							lagene, prioritert ut ifra hvilket lag som har flest (dette laget
							vil være lengst unna spawn-punktet).
						</p>
					</li>
					<li>
						<h4>Boss-stjerner</h4>
						<p>
							Boss-stjerner fås av å bekjempe «bosser» på brettet. Dette er over
							gjennomsnittet sterke fiender som spawner i forbindelse med
							oppdrag lag tar på seg.{" "}
						</p>
					</li>
					<li>
						<h4>Stjerne-biter</h4>
						<p>
							Stjerne-biter er deler av stjerner som alene er verdiløse, men
							blir til én stjerne når man har samlet tre. Disse vil lagene kunne
							få fra kister, av å slå fiender eller gjennom oppdrag.
							Stjerne-biter må settes sammen i en smie/butikk mot penger.{" "}
						</p>
					</li>
				</ul>
			</div>
			<div className="rulesRuleCard">
				<h3>Level-logikk</h3>

				<ul>
					<li>
						På en økt kan man få 1 til 3 poeng avhengig av selv-logget
						intensitetsnivå.
					</li>
					<li>
						Man kan logge så mange økter man vil pr. dag, men man kan ikke tjene
						mer enn 3 poeng.
						<ul>
							<li>Intensitetspoeng som overgår dette vil ikke telle som Xp.</li>
						</ul>
					</li>
					<li>
						Hver uke har hver spiller en level basert på ukens prestasjoner.
						<ul>
							<li>Man starter på Level 1 med 0 Xp. </li>
							<li>Xp tilsvarer øktpoeng.</li>
						</ul>
					</li>
					<li>Xp-krav for å gå opp i level pr. level er: level * 2</li>
					<li>
						Etter at Xp er omgjort til Level vil spilleren gå opp én level til
						hvis de har oppnådd ukesmål.
					</li>
				</ul>
				<p>
					Med en maks-grense på 21 mulige poeng mulige iløpet av en uke, er det
					urealistisk at noen når level 6, men det er i teorien maks-level.
				</p>
			</div>

			<div className="rulesRuleCard">
				<h3>Action points-logikk</h3>
				<p>Action points tjenes ganske rett frem via økter.</p>
				<ul>
					<li> Én økt er ett «Action point» (AP). Uavhengig av styrke. </li>
				</ul>
				<p>Hvert lag har to kilder til Action points:</p>
				<ul>
					<li>
						Laget vil bli tildelt tre AP pr. dag/tur i spillet, disse brukes
						først.
					</li>
					<li>
						I tillegg vil lagene ha sitt opptjente lager som er de som er samlet
						via økter.
					</li>
				</ul>
			</div>
		</main>
	);
};

export default Rules;
