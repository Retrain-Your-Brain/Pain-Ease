import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from pymongo import MongoClient
from sklearn.metrics import accuracy_score
url="mongodb+srv://navdishabhakri:7NNlNush0Ls8Uzcf@cluster0.zpctb21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
import joblib

client = MongoClient(url)

db = client["test"]  # Replace with your DB name
collection = db["symptoms"]  # Replace with your collection name
data_cursor = collection.find()
data = list(data_cursor)


# Convert to DataFrame
df = pd.DataFrame(data)
df = df.drop(columns=["_id"])
# View column names
print(df.columns)
print(df.head())

df = df.sort_values(by='date')
df['prev_pain'] = df['painScale'].shift(1)
df = df.dropna(subset=['prev_pain'])

# Select features and target
X = df[["water", "weight",'prev_pain']]           # input features
y = df["painScale"]                   # target variable

# For example, add a new column 'pain_increased' if painScale increased compared to previous and is above threshold
df['pain_increased'] = (df['painScale'] > 6) & (df['painScale'] > df['prev_pain'])

if df.iloc[-1]['pain_increased']:
    # Pain increased sharply — now prompt user to update plan
    print("Pain increased above threshold! Suggest plan update.")

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier()
model.fit(X_train, y_train)

predictions = model.predict(X_test)
print(predictions)

accuracy = accuracy_score(y_test, predictions)
print("Accuracy:", accuracy)
joblib.dump(model, 'pain_model.pkl')
