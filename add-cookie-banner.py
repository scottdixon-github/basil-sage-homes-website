import os
import re

# Cookie banner HTML
cookie_banner_html = '''
  <!-- Cookie Consent Banner -->
  <div id="cookie-consent-banner" class="cookie-consent-banner">
    <div class="cookie-consent-content">
      <div class="cookie-consent-text">
        <h3>🍪 We Value Your Privacy</h3>
        <p>
          We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
          By clicking "Accept All", you consent to our use of cookies. 
          <a href="cookies.html">Learn more about our cookie policy</a>.
        </p>
      </div>
      <div class="cookie-consent-buttons">
        <button id="cookie-accept" class="cookie-btn cookie-btn-accept">Accept All</button>
        <button id="cookie-decline" class="cookie-btn cookie-btn-decline">Decline</button>
      </div>
    </div>
  </div>'''

# Directory containing HTML files
html_dir = r'c:\Users\sdkoe\Desktop\Website for Demo'

# Files to skip
skip_files = ['index.html', 'cookies.html']

# Get all HTML files
html_files = [f for f in os.listdir(html_dir) if f.endswith('.html') and f not in skip_files]

print(f"Found {len(html_files)} HTML files to update")

for filename in html_files:
    filepath = os.path.join(html_dir, filename)
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if banner already exists
        if 'cookie-consent-banner' in content:
            print(f"⏭️  Skipping {filename} - banner already exists")
            continue
        
        # Find the closing </body> tag and insert banner before it
        if '</body>' in content:
            content = content.replace('</body>', cookie_banner_html + '\n</body>')
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✅ Updated {filename}")
        else:
            print(f"⚠️  Warning: {filename} has no </body> tag")
    
    except Exception as e:
        print(f"❌ Error processing {filename}: {str(e)}")

print("\n✨ Cookie banner addition complete!")
