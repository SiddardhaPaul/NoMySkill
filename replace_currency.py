import re

with open('src/data/mockTreeData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace $185k - $240k with ₹28L - ₹38L CTC
def salary_replacer(m):
    val1 = int(m.group(1))
    val2 = int(m.group(2))
    lakh1 = max(12, round(val1 * 0.16))
    lakh2 = max(18, round(val2 * 0.16))
    return f"₹{lakh1}L - ₹{lakh2}L CTC"

pattern = re.compile(r"\$(\d+)k\s*-\s*\$(\d+)k")
new_text = pattern.sub(salary_replacer, text)

new_text = new_text.replace("$1M to $50M ARR", "₹8 Cr to ₹400 Cr ARR")
new_text = new_text.replace("$8B+", "₹65,000 Cr+")
new_text = new_text.replace("$45M", "₹360 Cr")
new_text = new_text.replace("increases by $10", "increases by ₹10")
new_text = new_text.replace("decreases by $8", "decreases by ₹8")
new_text = new_text.replace("decreases by $2", "decreases by ₹2")
new_text = new_text.replace("$10 pretax", "₹10 pretax")
new_text = new_text.replace("($2 tax shield)", "(₹2 tax shield)")

with open('src/data/mockTreeData.ts', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Finished successfully!")
