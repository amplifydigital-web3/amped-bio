echo "production environment"
pod=$(kubectl get pods -n main | grep Running | grep 'onelink' | awk '{print $1}')

echo "Backup users's themes"
kubectl cp $pod:/htdocs/themes ./linkstack/themes -n main

echo "Backup users's avatars"
kubectl cp $pod:/htdocs/assets/img ./linkstack/assets/img -n main

echo "Done"
