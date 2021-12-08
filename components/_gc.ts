import React, { ReactElement } from 'react';

export default class GradeCalc {
	maxscore = 0;
	sections: Array<ReactElement> = [];
	inputSection: Array<ReactElement[]> = [[]];
	outputSection: Array<ReactElement> = [];
	fields: Array<ReactElement[]> = [];
	grades: number[] = [];
	ugrades: number[] = [];
	both = false;
	totalOutput: ReactElement;
    config: any[];

	constructor(config: {title: string, percentage: number}, outCallback: (arg: Array<ReactElement>) => void) {
		this.totalOutput = React.createElement('div');
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
			this.outputSection[i] = React.createElement('div');

			if (conf.bothMethods) {
				this.both = true;
			}

			this.sections[i] = (this.createSection(i));
		}

		// for (let [k, v] of this.fields.entries()) {
		// 	for (let field of v) {
		// 		this.addInputEventListener(k, field);
		// 	}
		// }

		outCallback(this.sections);
	}

	createSection(id: number): ReactElement {
		
        const conf = this.config[id];

		const heading = React.createElement('h2', {}, `${conf.title} (${conf.percentage}%)`);

        let info = null
		if (conf.info !== undefined)
			 info = (React.createElement('div', {}, conf.info));


		this.fields[id] = [];
        let inputSection: Array<ReactElement> | ReactElement = [];
		if (conf.points !== undefined) {
			for (let i = 0; i < conf.points.length; i++) {
				inputSection[i] = this.createInputSection(id, i);
			}
		}
		else {
            inputSection = this.createInputSection(id, 0, true);
		}

		const section = React.createElement('div', {className: conf.name}, heading, info, inputSection, 
            // this.outputSection[id]
        );

		return section;
	}

	createInputSection(sectId: number, inputId: number, soleInput: boolean = false): ReactElement {
		const conf = this.config[sectId];

        let label = '';
		if (soleInput)
			label = `${conf.title} Score: `;
		else
			label = `${conf.title} ${inputId + 1} Score: `;

		const field = React.createElement('input', {
            className: `input ${conf.name}-score`,
            onKeyUp: () => {
                if (conf.output !== undefined && conf.output)
                    this.showSectionGrade(inputId);
                this.showTotalGrade();
            }
        });

		this.fields[sectId][inputId] = field;
		let suffix = (soleInput) ? '%' : ` / ${conf.points[inputId]} pts`;

        const inputSection = React.createElement('div', {className: 'input-section'}, label, field, suffix);

		this.inputSection[sectId][inputId] = inputSection;
		return inputSection;
	}

	calculateSectionGrade(id: number, unweighted = false): number {
		// let conf = this.config[id];
		// let fields = this.fields[id];
		// if (fields === undefined)
		// 	return 0;
		// if (conf.points === undefined) {
		// 	return parseFloat(fields[0].value);
		// }

		// let total = 0;

		// if (unweighted) {
		// 	let counter = 0;
		// 	for (let [i, field] of fields.entries()) {
		// 		let val = parseFloat(field.value);
		// 		if (isNaN(val))
		// 			continue;
		// 		total += val / conf.points[i];
		// 		counter++;
		// 	}

		// 	return (total / counter * 100);
		// }

		// total = fields.reduce((acc, cur) => {
		// 	const c = parseFloat(cur.value);

		// 	return isNaN(c) ? acc : acc + c;
		// }, 0);

		// let max_total = 0;
		// for (const [i, field] of conf.points.entries()) {
		// 	if (isNaN(parseFloat(fields[i].value)))
		// 		continue;
		// 	max_total += field;
		// }

		// return (total / max_total * 100);
		return 0;
	}

	showSectionGrade(id: number) {
		let conf = this.config[id];
		let grade = this.calculateSectionGrade(id);
		let ugrade = this.calculateSectionGrade(id, true);


		this.grades[id] = grade * parseFloat(conf.percentage) / 100;
		this.ugrades[id] = ugrade * parseFloat(conf.percentage) / 100;

		const outGrade = !isNaN(grade) ? grade.toFixed(2) : "...";
		const outUgrade = !isNaN(ugrade) ? ugrade.toFixed(2) : "...";
		if (conf.bothMethods) {
			this.outputSection[id].props.children
				= `Score (weighted): ${outGrade}%<br> Score (unweighted): ${outUgrade}%`;
			return;
		}

		this.outputSection[id].props.value = `Score: ${grade}`;
	}

	showTotalGrade() {
		for (let [k, conf] of this.config.entries()) {
			if (!conf.output) {
				this.grades[k] = this.calculateSectionGrade(k) * parseFloat(conf.percentage) / 100;
				this.ugrades[k] = this.calculateSectionGrade(k, true) * parseFloat(conf.percentage) / 100;
			}
		}

		let grade: number = this.grades.reduce((a, c) => {
			if (isNaN(c))
				return a;
			return a + c
		}, 0);
		let ugrade: number = this.ugrades.reduce((a, c) => {
			if (isNaN(c))
				return a;
			return a + c
		}, 0);

		const outGrade = !isNaN(grade) ? grade.toFixed(2) : "...";
		const outUgrade = !isNaN(ugrade) ? ugrade.toFixed(2) : "...";
		if (this.both) {
			// this.totalOutput.props.children
				// = `Total Score (weighted): ${outGrade}%<br> Total Score (unweighted): ${outUgrade}%`;
			return;
		}

		// this.totalOutput.props.children = `Total Score: ${outGrade}%`;
	}

	get elemTotal() {
		return this.totalOutput;
	}
}