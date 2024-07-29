echo "Backup users's themes"

pod=$(kubectl get pods -n main | grep Running | grep 'onelink' | awk '{print $1}')
kubectl cp $pod:/htdocs/themes ./linkstack/themes -n main

echo "Done"
