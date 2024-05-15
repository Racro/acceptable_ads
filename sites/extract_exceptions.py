import json
import argparse
import sys

parser = argparse.ArgumentParser()
parser.add_argument('--list', type=str)
if len(sys.argv) < 2:
    parser.print_help(sys.stderr)
    sys.exit(1)
args = parser.parse_args()

domains = []

if args.list == 'exceptionrules.txt':
    f = open('exceptionrules.txt', 'r')
    rules = f.read().splitlines()
    f.close()

    root = []
    for rule in rules:
        if 'domain=' in rule:
            subset = rule.split('domain=')[1].split('|')
            
            for item in subset:
                if item.startswith('~', 0, 1):
                    item = item[1:]

                
                item_root = item.split('.')
                
                if len(item_root) < 2:
                    continue

                # print('initial - ', item, item_root, len(item_root))
                # if item.startswith('~', 0, 1):
                #     item = item[1:]
                #     item_root_1 = item_root[0]
                    
                if item_root[0] == 'www':
                    item_root_1 = item_root[1]
                else:
                    item_root_1 = item_root[0]
                    item_root_2 = item_root[-2]

                    if (item_root_1 != item_root_2) and (len(item_root_2) > 4):
                        if item_root_2 not in root:
                            # print(item_root_2)
                            root.append(item_root_2)
                            domains.append(item)
                        continue

                if item_root_1 not in root:
                    root.append(item_root_1)
                    domains.append(item)
        root = list(set(root))
        # print(root)
elif args.list == 'categories.json':
    f = open('categories.json', 'r')
    dictt = json.load(f)
    rules = []
    for key in dictt:
        rules.extend(dictt[key])
    f.close()

    root = []
    for item in rules:     
        item_root = item.split('.')
        
        if len(item_root) < 2:
            continue

        if item_root[0] == 'www':
            item = item[4:]
            item_root_1 = item_root[1]
        else:
            item_root_1 = item_root[0]
            item_root_2 = item_root[-2]

            if (item_root_1 != item_root_2) and (len(item_root_2) > 4):
                if item_root_2 not in root:
                    # print(item_root_2)
                    root.append(item_root_2)
                    domains.append(item)
                continue

        if item_root_1 not in root:
            root.append(item_root_1)
            domains.append(item)
    root = list(set(root))
    
else:
    print('Invalid list')

domains = list(set(domains))
print(len(domains))

json.dump(domains, open('exception_websites.txt', 'w'))