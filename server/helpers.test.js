import {excerptMaker} from "./helpers"

const example = "Christmas won\'t be Christmas without any presents,\" grumbled Jo, lying
on the rug.

\"It\'s so dreadful to be poor!\" sighed Meg, looking down at her old
dress.

\"I don\'t think it\'s fair for some girls to have plenty of pretty
things, and other girls nothing at all,\" added little Amy, with an
injured sniff.

\"We\'ve got Father and Mother, and each other,\" said Beth contentedly
from her corner.\"
The four young faces on which the firelight shone brightened at the
cheerful words, but darkened again as Jo said sadly, \"We haven\'t got
Father, and shall not have him for a long time.\""

test('excerpt maker', () => {
    expect(excerptMaker(example)).toBe(["\Christmas won\'t be Christmas without any presents,\" grumbled Jo, lying
on the rug.

\"It\'s so dreadful to be poor!\" sighed Meg, looking down at her old
dress.

\"I don\'t think it\'s fair for some girls to have plenty of pretty
things, and other girls nothing at all,\" added little Amy, with an
injured sniff.", "\"We\'ve got Father and Mother, and each other,\" said Beth contentedly
from her corner.\"
The four young faces on which the firelight shone brightened at the
cheerful words, but darkened again as Jo said sadly, \"We haven\'t got
Father, and shall not have him for a long time.\""]);
})

