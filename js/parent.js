function Parent(gene) {
	this.gene = gene;
}

Parent.prototype.setGene = function(newGene) {
	this.gene = newGene;
}

Parent.prototype.getGene = function() {
	return this.gene;
}

Parent.prototype.getAlleles = function() {
	var a1 = this.getGene().charAt(0),
		a2 = this.getGene().charAt(1);
	return [a1, a2];
}

Parent.getPossibleOffspring = function(male, female) {
	var mAlleles = male.getAlleles(), fAlleles = female.getAlleles();
	var results = [];
	
	for (var i = 0; i < fAlleles.length; i++) {
		var row = [];
		for (var j = 0; j < mAlleles.length; j++) {
			var offspring = (fAlleles[i] + mAlleles[j]).split('').sort().join().replace(/,/g, '');
			row.push(offspring);
		}
		results.push(row);
	}

	return results;
}