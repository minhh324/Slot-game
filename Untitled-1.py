import re

def is_anagram(s1, s2):
    matches = True
    res1 = ''.join(sorted(s1.lower()))
    res2 = ''.join(sorted(s2.lower()))
    e1 = re.sub('[^A-Za-z0-9]+', '', res1)
    e2 = re.sub('[^A-Za-z0-9]+', '', res2)
    if e1 == e2:
        print(matches)
    else:
        matches = False
        print(matches)
is_anagram("The check is in the mail!", "Claim \"Heck,I sent it(heh)\"")
