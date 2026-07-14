import os
from PIL import Image

def optimize_images():
    # Use real __file__ reference to get the scripts folder path
    script_dir = os.path.dirname(os.path.abspath(__file__))
    images_dir = os.path.abspath(os.path.join(script_dir, '../public/images'))
    
    print(f"Scanning images in: {images_dir}")
    
    if not os.path.exists(images_dir):
        print(f"Error: Directory {images_dir} does not exist.")
        return
        
    for filename in os.listdir(images_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            filepath = os.path.join(images_dir, filename)
            basename, ext = os.path.splitext(filename)
            webp_filepath = os.path.join(images_dir, f"{basename}.webp")
            
            print(f"Optimizing: {filename} ({os.path.getsize(filepath) / (1024*1024):.2f} MB)")
            
            try:
                with Image.open(filepath) as img:
                    # Scale down if width is greater than 1920px
                    max_width = 1920
                    if img.width > max_width:
                        w_percent = (max_width / float(img.width))
                        h_size = int((float(img.height) * float(w_percent)))
                        img = img.resize((max_width, h_size), Image.Resampling.LANCZOS)
                        print(f"  -> Scaled down to: {img.width}x{img.height}")
                        
                    # Save as WebP with 92% visual quality
                    img.save(webp_filepath, 'WEBP', quality=92)
                    
                print(f"  -> Saved as WebP: {basename}.webp ({os.path.getsize(webp_filepath) / 1024:.1f} KB)")
                
                # Delete original file
                os.remove(filepath)
                print(f"  -> Removed original: {filename}")
                
            except Exception as e:
                print(f"Error processing {filename}: {e}")

    # Now update codebase references
    root_dir = os.path.abspath(os.path.join(script_dir, '..'))
    
    files_to_update = [
        os.path.join(root_dir, 'src/data/treks.ts'),
        os.path.join(root_dir, 'public/sitemap.xml'),
        os.path.join(root_dir, 'scripts/prerender.js')
    ]
    
    for file_path in files_to_update:
        if os.path.exists(file_path):
            print(f"Updating references in: {file_path}")
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace file extensions in codebase strings
            content_updated = content.replace('.jpg', '.webp').replace('.jpeg', '.webp').replace('.png', '.webp')
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content_updated)
            print("  -> Done.")

if __name__ == '__main__':
    optimize_images()
