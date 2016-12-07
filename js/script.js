$(function(){
	// Clicks
	$('.option').click(function(){
		var cl = $(this).attr("data-gene")
		var gene = (cl == "hd") ? "PP" : (cl == "he") ? "Pp" : "pp";
		var parent = $(this).parent().parent().parent().attr('id');

		if (animate(this, parent)) {
			if (parent == "male")
				parents.male.setGene(gene);
			else
				parents.female.setGene(gene);
		} else {
			if (parent == "male")
				parents.male.setGene(null);
			else
				parents.female.setGene(null);
		}

		checkIfCalculable();
	});
	$('#about-button').click(function(){ $('#about-screen').fadeIn(250) });
	$('#about button').click(function(){ $('#about-screen').fadeOut(250) });
});

var parents = {
	male: new Parent(null),
	female: new Parent(null)
};

function animate(opt, parent) {
	if ($(opt).hasClass("active")) {
		$(opt).removeClass("active");
		return false;
	} else {
		$('#' + parent + ' .active').removeClass("active");
		$(opt).addClass('active');
		return true;
	}
}

function checkIfCalculable() {
	if (parents.male.getGene() == null || parents.female.getGene() == null)
		$(".punnett table").empty();
	else
		punnett(parents.male, parents.female);
}

function punnett(male, female) {
	var mAlleles = male.getAlleles(), fAlleles = female.getAlleles();
	var offspring = Parent.getPossibleOffspring(male, female);
	$(".punnett table").empty();

	var tr = $("<tr></tr>").append($("<td></td>").addClass("head"));
	for (var i = 0; i < mAlleles.length; i++) {
		var td = $("<td></td>").text(mAlleles[i]).addClass("head");
		$(tr).append(td);
	}
	$(".punnett table").append(tr);

	for (var i = 0; i < offspring.length; i++) {
		var tr = $("<tr></tr>").append($("<td></td>").addClass("head").text(fAlleles[i]));
		var row = offspring[i];
		for (var j = 0; j < row.length; j++) {
			var td = $("<td></td>").text(row[j]);
			$(tr).append(td);
		}
		$(".punnett table").append(tr);
	}

	$(".punnett td").each(function(){
		var content = $(this).text();
		if (content.length == 2) {
			var cls = (content == "PP") ? "hd" : (content == "Pp") ? "he" : "hr";
			$(this).addClass(cls);
		}
	});
}
