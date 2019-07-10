const unescapeUnicode = inputText => {
	return decodeURIComponent(JSON.parse(`"${inputText.replace('"', '\\"')}"`));
};

module.exports = {
	unescapeUnicode // unsecape text with unicode entities
};