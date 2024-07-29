echo "Restore users's themes"

pod=$(kubectl get pods -n dev | grep Running | grep 'onelink' | awk '{print $1}')
kubectl cp ./linkstack/themes $pod:/htdocs/ -n dev

echo "Done"
