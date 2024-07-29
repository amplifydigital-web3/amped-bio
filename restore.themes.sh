echo "Restore users's themes"

pod=$(kubectl get pods -n main | grep Running | grep 'onelink' | awk '{print $1}')
kubectl cp ./linkstack/themes $pod:/htdocs/ -n main

echo "Done"
