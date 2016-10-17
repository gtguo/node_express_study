var fortunes = [
    "Conquer your fears or they will Conquer you.",
    "Rivers need spring.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple."
]

exports.getFortunes = function(){
    var idx = fortunes[Math.floor(Math.random() * fortunes.length)];
    return idx;
}