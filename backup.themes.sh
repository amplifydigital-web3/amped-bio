echo "production environment"
pod=$(kubectl get pods -n main | grep Running | grep 'onelink' | awk '{print $1}')

echo "Backup users's themes"
kubectl cp $pod:/htdocs/themes ./linkstack/themes -c onelink -n main

echo "Backup users's avatars"
kubectl cp $pod:/htdocs/assets/img ./linkstack/assets/img -c onelink -n main

echo "Done"
