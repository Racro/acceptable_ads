import json
import argparse
import sys

parser = argparse.ArgumentParser()
parser.add_argument('--file', type=str)
if len(sys.argv) < 2:
    parser.print_help(sys.stderr)
    sys.exit(1)
args = parser.parse_args()

lst = json.load(open(args.file, 'r'))

fname = args.file.split('.')[0]
f = open(f'{fname}.txt', 'w')
for site in lst:
    f.write(site)
    f.write('\n')
f.close()
