import os
from pathlib import Path

def main():
    print("This is the main function of the conversion module.")
    awesome_templates_path = os.path.join(os.path.dirname(__file__), 'data/templates', 'awesome-n8n-templates')
    category_output_path = os.path.join(os.path.dirname(__file__), 'data/templates')

    print(f"Awesome templates path: {awesome_templates_path}")
    root_path = Path(awesome_templates_path)
    print(f"Root path: {root_path}")
    category_dir =  [dir for dir in  root_path.glob('*') if dir.is_dir() and not dir.name.startswith('.')]
    for category in category_dir:
        print(f"Processing category: {category.name}")
        for file in category.glob('*.json'):
            print(f"Found file: {file.name}")



if __name__ == "__main__":
    main()
