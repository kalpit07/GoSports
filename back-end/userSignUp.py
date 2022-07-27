import json
import boto3


def lambda_handler(event, context):

    details = json.loads(event["body"])
    email = details["email"]
    event_id = details["event_id"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table("eventInfo-GoSports")
    response = table.scan()
    data = response['Items']

    for event in data:
        if event["event_id"] == event_id:
            if int(event["available_seats"]) == 0:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({"message": "No more seats available."})
                }
            else:
                event["available_seats"] = str(
                    int(event["available_seats"]) - 1)
                users = event["registered_users"]
                if email in users:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({"message": "Already booking for this event."})
                    }
                else:
                    users.append(email)
                    event["registered_users"] = users
                    table.put_item(Item=event)
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({"message": "Booking successful."})
                    }
