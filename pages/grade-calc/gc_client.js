class GradeCalc {
	maxscore = 0;
	sections = [];
	inputSection = [];
	outputSection = [];
	fields = [];
	grades = [];
	ugrades = [];
	both = false;
	totalOutput = null;

	constructor(config, outCallback) {
		this.totalOutput = document.createElement("div");
		let dConfig = JSON.parse(JSON.stringify(config)); // dirty clone
		let sanConfig = [];
		for (let conf of dConfig) {
			if (conf.percentage === undefined || conf.name === undefined)
				continue;
			if (conf.title === undefined)
				conf.title = conf.name[0].toUpperCase() + conf.name.slice(1);
			sanConfig.push(conf);
		}
		this.config = sanConfig;
		for (let [i, conf] of this.config.entries()) {
			this.maxscore += conf.percentage;

			this.inputSection[i] = [];
			this.outputSection[i] = document.createElement("div");

			if (conf.bothMethods) {
				this.both = true;
			}

			this.sections[i] = (this.createSection(i));
		}

		for (let [k, v] of this.fields.entries()) {
			for (let field of v) {
				this.addInputEventListener(k, field);
			}
		}

		outCallback(this.sections);
	}

	createSection(id) {
		let conf = this.config[id];

		var section = document.createElement("div");
		section.classList.add(conf.name);

		var heading = document.createElement("h2");
		heading.innerHTML = `${conf.title} (${conf.percentage}%)`;

		section.appendChild(heading);

		if (conf.info !== undefined)
			section.appendChild(document.createTextNode(conf.info));

		this.fields[id] = [];
		if (conf.points !== undefined) {
			for (var i = 0; i < conf.points.length; i++) {
				section.appendChild(this.createInputSection(id, i));
			}
		}
		else {
			section.appendChild(this.createInputSection(id, 0, true));
		}


		section.appendChild(this.outputSection[id]);
		return section;
	}

	createInputSection(sectId, inputId, soleInput = false) {
		let conf = this.config[sectId];
		let inputSection = document.createElement("div");
		inputSection.classList.add("input-section");

		let label = document.createElement("label");
		if (soleInput)
			label.innerHTML = `${conf.title} Score: `;
		else
			label.innerHTML = `${conf.title} ${inputId + 1} Score: `;

		let field = document.createElement("input");
		field.classList.add(`${conf.name}-score`);
		this.fields[sectId][inputId] = field;

		let suffix = (soleInput) ? "%" : ` / ${conf.points[inputId]} pts`;

		inputSection.appendChild(label);
		inputSection.appendChild(field);
		inputSection.appendChild(document.createTextNode(suffix));

		this.inputSection[sectId][inputId] = inputSection;
		return inputSection;
	}

	addInputEventListener(id, field, event = "keyup") {
		let conf = this.config[id];
		field.addEventListener(event, () => {
			if (conf.output !== undefined && conf.output)
				this.showSectionGrade(id);
			this.showTotalGrade();
		});
	}

	calculateSectionGrade(id, unweighted = false) {
		let conf = this.config[id];
		let fields = this.fields[id];
		if (fields === undefined)
			return;
		if (conf.points === undefined) {
			return parseFloat(fields[0].value);
		}

		let total = 0;

		if (unweighted) {
			let counter = 0;
			for (let [i, field] of fields.entries()) {
				let val = parseFloat(field.value);
				if (isNaN(val))
					continue;
				total += val / conf.points[i];
				counter++;
			}

			return (total / counter * 100);
		}

		total = fields.reduce((acc, cur) => {
			let c = parseFloat(cur.value);
			if (isNaN(c))
				return acc;
			return acc + parseFloat(c);
		}, 0);

		let max_total = 0;
		for (let [i, field] of conf.points.entries()) {
			if (isNaN(parseFloat(fields[i].value)))
				continue;
			max_total += field;
		}

		return (total / max_total * 100);
	}

	showSectionGrade(id) {
		let conf = this.config[id];
		let grade = this.calculateSectionGrade(id);
		let ugrade = this.calculateSectionGrade(id, true);


		this.grades[id] = grade * parseFloat(conf.percentage) / 100;
		this.ugrades[id] = ugrade * parseFloat(conf.percentage) / 100;

		grade = !isNaN(grade) ? grade.toFixed(2) : "...";
		ugrade = !isNaN(ugrade) ? ugrade.toFixed(2) : "...";
		if (conf.bothMethods) {
			this.outputSection[id].innerHTML
				= `Score (weighted): ${grade}%<br> Score (unweighted): ${ugrade}%`;
			return;
		}

		this.outputSection[id].innerHTML = `Score: ${grade}`;
	}

	showTotalGrade() {
		for (let [k, conf] of this.config.entries()) {
			if (!conf.output) {
				this.grades[k] = this.calculateSectionGrade(k) * parseFloat(conf.percentage) / 100;
				this.ugrades[k] = this.calculateSectionGrade(k, true) * parseFloat(conf.percentage) / 100;
			}
		}

		let grade = this.grades.reduce((a, c) => {
			if (isNaN(c))
				return a;
			return a + c
		}, 0);
		let ugrade = this.ugrades.reduce((a, c) => {
			if (isNaN(c))
				return a;
			return a + c
		}, 0);

		grade = !isNaN(grade) ? grade.toFixed(2) : "...";
		ugrade = !isNaN(ugrade) ? ugrade.toFixed(2) : "...";
		if (this.both) {
			this.totalOutput.innerHTML
				= `Total Score (weighted): ${grade}%<br> Total Score (unweighted): ${ugrade}%`;
			return;
		}

		this.totalOutput.innerHTML = `Total Score: ${grade}%`;
	}

	get elemTotal() {
		return this.totalOutput;
	}
}